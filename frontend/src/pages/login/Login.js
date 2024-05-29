import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { SERVER_PORT } from "../../config";

// const AUTO_LOGOUT_TIME = 30 * 60 * 1000;
// const WARNING_TIME = 1 * 60 * 1000;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // const [showWarning, setShowWarning] = useState(false);
  // const logoutTimer = useRef(null);
  // const warningTimer = useRef(null);

  // const startWarningTimer = () => {
  //   if (warningTimer.current) clearTimeout(warningTimer.current);
  //   warningTimer.current = setTimeout(() => {
  //     console.log(
  //       "Showing warning message: User will be logged out in 1 minutes due to inactivity"
  //     );
  //     setShowWarning(true);
  //   }, AUTO_LOGOUT_TIME - WARNING_TIME);
  // };

  // const startLogoutTimer = () => {
  //   if (logoutTimer.current) clearTimeout(logoutTimer.current);
  //   logoutTimer.current = setTimeout(() => {
  //     handleLogout();
  //   }, AUTO_LOGOUT_TIME);
  // };

  // const refreshAccessToken = async () => {
  //   const token = localStorage.getItem("access_token");
  //   if (!token) {
  //     console.log("No token found, logging out");
  //     handleLogout();
  //     return;
  //   }

  //   try {
  //     console.log("Attempting to refresh token");
  //     const response = await fetch(SERVER_PORT + "/users/refresh-token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token }),
  //     });

  //     if (!response.ok) {
  //       console.log("Token refresh failed, logging out");
  //       handleLogout();
  //       return;
  //     }

  //     const data = await response.json();
  //     localStorage.setItem("access_token", data.token);
  //     console.log("Token refreshed successfully");
  //     startLogoutTimer();
  //     startWarningTimer();
  //     setShowWarning(false);
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     handleLogout();
  //   }
  // };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      if (Date.now() >= exp * 1000) {
        console.log("Token expired, logging out");
        handleLogout();
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    try {
      console.log("Attempting to log in with email:", email);
      const response = await fetch(SERVER_PORT + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Server response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Login failed:",
          errorData.message || "Invalid email or password"
        );
        throw new Error(
          errorData.message || "잘못된 이메일이거나 비밀번호입니다."
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user_id", data.user.id);

      console.log(
        "Login successful, user authenticated, navigating to homepage"
      );
      // startLogoutTimer();
      // startWarningTimer();
      navigate("/"); // Navigate to the homepage
    } catch (error) {
      setErrorMessage(error.message);
      console.error("로그인 실패:", error);
    }
  };

  const handleLogout = () => {
    console.log("User is being logged out due to inactivity");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("currentUser");
    navigate("/users/login");
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.loginText}>Login</div>
        <section className={styles.section}>
          <div>
            <form onSubmit={handleLogin}>
              <div className={styles.email}>Email</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.id}
                type="email"
                placeholder="example@email.com"
              />
              <div className={styles.password}>Password</div>
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
                비밀번호를 잊으셨나요?
              </Link>
              <button className={styles.loginBtn} type="submit">
                로그인
              </button>
            </form>
            <button className={styles.kakaoBtn}>카카오 로그인</button>
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
