import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const logoutTimer = useRef(null);

  const startLogoutTimer = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => {
      handleLogout();
    }, AUTO_LOGOUT_TIME);
  };

  const refreshAccessToken = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/users/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        handleLogout();
        return;
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.token);
      startLogoutTimer();
    } catch (error) {
      handleLogout();
    }
  };

  useEffect(() => {
    const resetTimer = () => {
      refreshAccessToken();
      startLogoutTimer();
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    console.log("Login attempt with email:", email);

    try {
      const response = await fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Server response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data from server:", errorData);
        throw new Error(
          errorData.message || "잘못된 이메일이거나 비밀번호입니다."
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.token) {
        // Checking for the token
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("user_id", data.user.id);
        startLogoutTimer();
        console.log("Login successful, navigating to homepage");
        navigate("/"); // Navigate to the homepage
      } else {
        throw new Error("잘못된 이메일이거나 비밀번호입니다.");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("로그인 실패:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    navigate("/users/login");
  };

  return (
    <>
      <Header />

      <div className={styles.page}>
        <div className={styles.loginText}>로그인</div>
        <section className={styles.section}>
          <div>
            <form onSubmit={handleLogin}>
              <div className={styles.email}>이메일</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.id}
                type="email"
                placeholder="example@email.com"
              />
              <div className={styles.password}>비밀번호</div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={styles.pw}
                type="password"
                placeholder="비밀번호"
              />
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
              <Link to="./findpw" className={styles.findPw}>
                비밀번호찾기
              </Link>
              <button className={styles.loginBtn} type="submit">
                이메일 로그인
              </button>
            </form>
            <button className={styles.kakaoBtn}>Kakao로 시작하기</button>
            <Link to="../users/register" className={styles.goToSignUp}>
              계정이 없으신가요?
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Login;
