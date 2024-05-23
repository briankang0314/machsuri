import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import Header from "../../components/header/Header";

function Register() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/locations/regions")
      .then((response) => response.json())
      .then((data) => setRegions(data))
      .catch((error) => console.error("Error fetching regions:", error));
  }, []);

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);

    fetch(`http://localhost:5001/locations/regions/${regionId}/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const sendUserSignUp = () => {
    fetch("http://localhost:5001/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupValue),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        alert("회원가입 성공");
      })
      .then(() => navigate("/"))
      // 에러핸들링 수정 필요
      .catch((err) => {
        alert(err.message);
      });
  };

  const navigate = useNavigate();

  const [signupValue, setSignupValue] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    cityId: 1,
    role: "general",
  });

  const { name, password, email, phoneNumber, cityId } = signupValue;
  const onChange = (e) => {
    const { name, value } = e.target;
    setSignupValue({
      ...signupValue,
      [name]: value,
    });
  };

  const [visiblePW, setPwVisible] = useState("password");
  const [agreeCheck, setAgreeCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const invalidNameTag = useRef("");
  const invalidIdTag = useRef("");
  const invalidPwTag = useRef("");
  const invalidPhoneTag = useRef("");
  const invalidAgreeTag = useRef("");
  const invalidAgeTag = useRef("");

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const phoneReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

  return (
    <section className={styles.section}>
      <Header />
      <h3 className={styles.title}>
        서울/경기 오더방(가칭)에 오신 것을 환영합니다
      </h3>
      <div className={styles.card}>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            <p className={styles.inputName}>이름</p>
            <input
              className={
                2 <= name.length || !name
                  ? styles.inputValue
                  : `${styles.inputValue} ${styles.invalid}`
              }
              type="text"
              placeholder="이름(실명)을 입력해주세요"
              name="name"
              onChange={onChange}
            />
            <div
              ref={invalidNameTag}
              className={
                2 <= name.length || !name
                  ? `${styles.invalidInput} ${styles.Off}`
                  : `${styles.invalidInput}`
              }
            >
              이름을 입력해주세요.
            </div>
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputName}>이메일</p>
            <input
              className={
                emailReg.test(email) || !email
                  ? styles.inputValue
                  : `${styles.inputValue} ${styles.invalid}`
              }
              name="email"
              type="text"
              placeholder="example@machsuri.com"
              onChange={onChange}
            />
            <div
              ref={invalidIdTag}
              className={
                emailReg.test(email) || !email
                  ? `${styles.invalidInput} ${styles.Off}`
                  : `${styles.invalidInput}`
              }
            >
              이메일 주소를 입력해주세요.
            </div>
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputName}>비밀번호</p>
            <div className={styles.pwBox}>
              <input
                className={
                  pwReg.test(password) || !password
                    ? styles.inputValue
                    : `${styles.inputValue} ${styles.invalid}`
                }
                name="password"
                type={visiblePW}
                placeholder="영문+숫자 조합 8자리 이상 입력해주세요"
                onChange={onChange}
              />
              <button
                className={`${styles.pwType}`}
                value="표시"
                onClick={(e) => {
                  e.preventDefault();
                  if (e.target.childNodes[0].data === "표시") {
                    setPwVisible("text");
                    e.target.childNodes[0].data = "숨김";
                  } else {
                    setPwVisible("password");
                    e.target.childNodes[0].data = "표시";
                  }
                }}
              >
                표시
              </button>
            </div>
            <div
              ref={invalidPwTag}
              className={
                pwReg.test(password) || !password
                  ? `${styles.invalidInput} ${styles.Off}`
                  : `${styles.invalidInput}`
              }
            >
              비밀번호를 입력해주세요.
            </div>
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputName}>전화번호</p>
            <input
              className={
                phoneReg.test(phoneNumber) || !phoneNumber
                  ? styles.inputValue
                  : `${styles.inputValue} ${styles.invalid}`
              }
              type="text"
              placeholder="휴대폰 번호를 입력해주세요"
              name="phoneNumber"
              onChange={onChange}
            />
            <div
              ref={invalidPhoneTag}
              className={
                phoneReg.test(phoneNumber) || !phoneNumber
                  ? `${styles.invalidInput} ${styles.Off}`
                  : `${styles.invalidInput}`
              }
            >
              올바른 전화번호를 입력해주세요.
            </div>
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputName}>지역</p>
            <select
              className={
                selectedRegion
                  ? styles.inputValue
                  : `${styles.inputValue} ${styles.invalid}`
              }
              name="region"
              value={selectedRegion}
              onChange={handleRegionChange}
            >
              <option value="">지역을 선택해주세요</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputBox}>
            <p className={styles.inputName}>도시</p>
            <select
              className={
                cityId
                  ? styles.inputValue
                  : `${styles.inputValue} ${styles.invalid}`
              }
              name="cityId"
              value={cityId}
              onChange={onChange}
              disabled={!selectedRegion}
            >
              <option value="">도시를 선택해주세요</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.checkBox}>
            <input
              id="checkbox1"
              className={styles.checkboxCSS}
              type="checkbox"
              name="personalInfo"
              value="personalInto"
              checked={agreeCheck}
              onChange={() => setAgreeCheck((prev) => !prev)}
            />
            <label htmlFor="checkbox1">
              <span className={styles.checkInner}>✔</span>
            </label>
            이용약관, 개인정보 수집 및 이용 동의 (필수)
            <p
              ref={invalidAgreeTag}
              className={`${styles.invalidInput} ${styles.Off}`}
            >
              이용약관에 동의해주세요.
            </p>
          </div>
          <div className={styles.checkBox}>
            <input
              id="checkbox2"
              className={styles.checkboxCSS}
              type="checkbox"
              name="age-check"
              value="age-agreement"
              checked={ageCheck}
              onChange={() => setAgeCheck((prev) => !prev)}
            />
            <label htmlFor="checkbox2">
              <span className={styles.checkInner}>✔</span>
            </label>
            만 14세 이상 (필수)
            <p
              ref={invalidAgeTag}
              className={`${styles.invalidInput} ${styles.Off}`}
            >
              만 14세 이상 가입에 동의해주세요.
            </p>
          </div>

          <button
            className={styles.signUpBtn}
            onClick={(e) => {
              e.preventDefault();
              if (
                emailReg.test(email) &&
                pwReg.test(password) &&
                2 <= name.length &&
                agreeCheck &&
                ageCheck
              ) {
                sendUserSignUp();
              }
              if (name.length < 2) {
                invalidNameTag.current.className = `${styles.invalidInput}`;
              }

              if (!emailReg.test(email)) {
                invalidIdTag.current.style.display = "block";
              }
              if (!pwReg.test(password)) {
                invalidPwTag.current.style.display = "block";
              }
              if (!phoneReg.test(phoneNumber)) {
                invalidPhoneTag.current.style.display = "block";
              }
              if (!agreeCheck) {
                invalidAgreeTag.current.className = `${styles.invalidInput}`;
              }
              if (!ageCheck) {
                invalidAgeTag.current.className = `${styles.invalidInput}`;
              }
            }}
          >
            회원가입
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
