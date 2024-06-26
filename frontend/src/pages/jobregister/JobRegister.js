import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "./JobRegister.module.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { SERVER_PORT, FRONT_PORT } from "../../config";

function JobRegister() {
  const navigate = useNavigate();
  const amountInputRef = useRef(null);
  const feeInputRef = useRef(null);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [majorCategories, setMajorCategories] = useState([]);
  const [minorCategories, setMinorCategories] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedMajorCategory, setSelectedMajorCategory] = useState("");
  const [selectedMinorCategories, setSelectedMinorCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [cityId, setCityId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false); // State for 협의필요
  const [isMinimumAmount, setIsMinimumAmount] = useState(false); // State for 최소금액부터

  useEffect(() => {
    const disableScroll = (e) => e.preventDefault();

    const amountInput = amountInputRef.current;
    const feeInput = feeInputRef.current;

    if (amountInput) {
      amountInput.addEventListener("wheel", disableScroll);
    }
    if (feeInput) {
      feeInput.addEventListener("wheel", disableScroll);
    }

    return () => {
      if (amountInput) {
        amountInput.removeEventListener("wheel", disableScroll);
      }
      if (feeInput) {
        feeInput.removeEventListener("wheel", disableScroll);
      }
    };
  }, []);

  useEffect(() => {
    console.log("Fetching regions data...");
    fetch(SERVER_PORT + "/locations/regions")
      .then((response) => response.json())
      .then((data) => {
        console.log("Regions data received:", data);
        setRegions(data);
      })
      .catch((error) => console.error("Error fetching regions:", error));

    console.log("Fetching major categories data...");
    fetch(SERVER_PORT + "/categories/major-categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Major categories data received:", data);
        setMajorCategories(data);
      })
      .catch((error) =>
        console.error("Error fetching major categories:", error)
      );
  }, []);

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);
    console.log("Selected region ID:", regionId);

    console.log(`Fetching cities data for region ID ${regionId}...`);
    fetch(SERVER_PORT + `/locations/regions/${regionId}/cities`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Cities data received for region ID", regionId, ":", data);
        setCities(data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleMajorCategoryChange = (e) => {
    const majorCategoryId = e.target.value;
    setSelectedMajorCategory(majorCategoryId);
    console.log("Selected major category ID:", majorCategoryId);

    console.log(
      `Fetching minor categories data for major category ID ${majorCategoryId}...`
    );
    fetch(
      SERVER_PORT +
        `/categories/major-categories/${majorCategoryId}/minor-categories`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "Minor categories data received for major category ID",
          majorCategoryId,
          ":",
          data
        );
        if (Array.isArray(data)) {
          setMinorCategories(data);
        } else {
          console.error(
            "Expected minor categories data to be an array but got:",
            data
          );
          setMinorCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching minor categories:", error);
        setMinorCategories([]);
      });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    document.getElementById(
      "file-chosen"
    ).textContent = `${files.length} 파일 선택됨`;
  };

  const handleThumbnailClick = (index) => {
    setThumbnailIndex(index);
  };

  const handleFeeChange = (e) => {
    const value = e.target.value;
    setFee(value);
    console.log("Fee state updated to:", value);
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    console.log("Handling job post submission...");
    console.log("Fee state before submission:", fee);

    const minorCategoryIds = selectedMinorCategories.map(
      (category) => category.value
    );

    if (!title) {
      setErrorMessage("Title is required.");
      setLoading(false);
      return;
    }

    if (!summary) {
      setErrorMessage("Summary is required.");
      setLoading(false);
      return;
    }

    if (!isNegotiable && !amount) {
      setErrorMessage("Amount is required when it is not negotiable.");
      setLoading(false);
      return;
    }

    // Validate amount to ensure it is a valid number
    if (!isNegotiable && isNaN(amount)) {
      setErrorMessage("Amount must be a valid number.");
      setLoading(false);
      return;
    }

    if (!fee) {
      setErrorMessage("Fee is required.");
      setLoading(false);
      return;
    }

    if (!contactInfo) {
      setErrorMessage("Contact information is required.");
      setLoading(false);
      return;
    }

    if (!selectedRegion) {
      setErrorMessage("Region is required.");
      setLoading(false);
      return;
    }

    if (!cityId) {
      setErrorMessage("City is required.");
      setLoading(false);
      return;
    }

    if (!selectedMajorCategory) {
      setErrorMessage("Major category is required.");
      setLoading(false);
      return;
    }

    if (selectedMinorCategories.length === 0) {
      setErrorMessage("At least one minor category is required.");
      setLoading(false);
      return;
    }

    console.log("Formatted minorCategoryIds:", minorCategoryIds);

    const formData = new FormData();
    formData.append("cityId", cityId);
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("amount", amount);
    formData.append("fee", fee);
    formData.append("contactInfo", contactInfo);
    formData.append("minorCategoryIds", JSON.stringify(minorCategoryIds));
    images.forEach((image, index) => {
      formData.append("images", image);
    });
    formData.append("thumbnailIndex", thumbnailIndex);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch(SERVER_PORT + "/jobs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "TOKEN_EXPIRED") {
          setErrorMessage("Your session has expired. Please log in again.");
          navigate("/login");
        } else {
          throw new Error(errorData.message || "Job post failed.");
        }
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Job post failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNegotiableChange = () => {
    setIsNegotiable(true);
    setIsMinimumAmount(false);
    setAmount(0); // Clear amount when 협의필요 is selected
  };

  const handleMinimumAmountChange = () => {
    setIsNegotiable(false);
    setIsMinimumAmount(true);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;
    setAmount(value);
  };

  return (
    <>
      <Header />
      <div className={styles.section}>
        <h1 className={styles.title}>오더 등록</h1>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleJobPost}>
            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="title">
                제목
              </label>
              <input
                id="title"
                className={styles.inputValue}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="오더의 제목을 입력하세요"
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="summary">
                설명
              </label>
              <textarea
                id="summary"
                className={styles.inputValue}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                placeholder="작업일자 및 특이사항을 입력하세요"
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="majorCategory">
                주요 카테고리
              </label>
              <select
                id="majorCategory"
                className={styles.inputValue}
                value={selectedMajorCategory}
                onChange={handleMajorCategoryChange}
                required
              >
                <option value="">주요 카테고리를 선택해주세요</option>
                {majorCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="minorCategories">
                부수 카테고리
              </label>
              <Select
                id="minorCategories"
                className={styles.selectValue}
                isMulti
                options={minorCategories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                value={selectedMinorCategories}
                onChange={setSelectedMinorCategories}
                isDisabled={!selectedMajorCategory}
                placeholder="부수 카테고리를 선택해주세요"
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="region">
                지역
              </label>
              <select
                id="region"
                className={styles.inputValue}
                value={selectedRegion}
                onChange={handleRegionChange}
                required
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
              <label className={styles.inputName} htmlFor="cityId">
                도시
              </label>
              <select
                id="cityId"
                className={styles.inputValue}
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                required
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

            <div className={styles.inputBox}>
              <label className={styles.inputNameWithCheckboxes}>
                금액 (KRW)
                <div className={styles.checkboxContainer}>
                  <label>
                    <input
                      type="checkbox"
                      checked={isNegotiable}
                      onChange={handleNegotiableChange}
                    />
                    협의필요
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={isMinimumAmount}
                      onChange={handleMinimumAmountChange}
                    />
                    최소금액부터
                  </label>
                </div>
              </label>
              <input
                id="amount"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                className={`${styles.inputValue} ${styles.noSpinner}`}
                value={amount}
                onChange={handleAmountChange}
                disabled={isNegotiable}
                required={!isNegotiable}
                placeholder="금액을 입력하세요"
                ref={amountInputRef}
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="fee">
                수수료(%)
              </label>
              <input
                id="fee"
                type="number"
                min="0"
                max="100"
                step="1"
                inputMode="numeric"
                className={`${styles.inputValue} ${styles.noSpinner}`}
                value={fee}
                onChange={handleFeeChange}
                required
                placeholder="0에서 100 사이의 숫자를 입력하세요"
                ref={feeInputRef}
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="contactInfo">
                연락처
              </label>
              <input
                id="contactInfo"
                className={styles.inputValue}
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
                placeholder="지원자로부터 연락 받으실 전화번호를 입력하세요"
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="images">
                이미지 업로드(5장까지)
              </label>
              <div>
                <input
                  id="images"
                  type="file"
                  className={styles.inputValue}
                  onChange={handleImageChange}
                  multiple
                />
                <label htmlFor="images" className={styles.customFileUpload}>
                  파일 선택
                </label>
                <span id="file-chosen" className={styles.fileChosen}>
                  {imagePreviews.length > 0
                    ? `${imagePreviews.length} 파일 선택됨`
                    : "파일을 선택해주세요"}
                </span>
              </div>
            </div>
            <div className={styles.inputBox}>
              <label className={styles.inputName}>썸네일 선택</label>
              <div className={styles.thumbnailGrid}>
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className={`${styles.thumbnail} ${
                      thumbnailIndex === index ? styles.selectedThumbnail : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img src={preview} alt={`Thumbnail ${index}`} />
                  </div>
                ))}
              </div>
            </div>

            {loading && <p>Loading...</p>}
            {successMessage && (
              <p className={styles.successMessage}>{successMessage}</p>
            )}
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              작업 등록
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobRegister;
