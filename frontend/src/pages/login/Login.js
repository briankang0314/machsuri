import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
