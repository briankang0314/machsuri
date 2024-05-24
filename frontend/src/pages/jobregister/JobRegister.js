import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "./JobRegister.module.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function JobRegister() {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [majorCategories, setMajorCategories] = useState([]);
  const [minorCategories, setMinorCategories] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedMajorCategory, setSelectedMajorCategory] = useState("");
  const [selectedMinorCategories, setSelectedMinorCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [amount, setAmount] = useState("");
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
    console.log("Fetching regions data...");
    fetch("http://localhost:5001/locations/regions")
      .then((response) => response.json())
      .then((data) => {
        console.log("Regions data received:", data);
        setRegions(data);
      })
      .catch((error) => console.error("Error fetching regions:", error));

    console.log("Fetching major categories data...");
    fetch("http://localhost:5001/categories/major-categories")
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
    fetch(`http://localhost:5001/locations/regions/${regionId}/cities`)
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
      `http://localhost:5001/categories/major-categories/${majorCategoryId}/minor-categories`
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
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleThumbnailClick = (index) => {
    setThumbnailIndex(index);
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    console.log("Handling job post submission...");

    const minorCategoryIds = selectedMinorCategories.map(
      (category) => category.value
    );
    if (
      !title ||
      !summary ||
      (!isNegotiable && !amount) ||
      !fee ||
      !contactInfo ||
      !selectedRegion ||
      !cityId ||
      !selectedMajorCategory ||
      selectedMinorCategories.length === 0
    ) {
      setErrorMessage("All fields are required and must be properly filled.");
      setLoading(false);
      return;
    }

    console.log("Formatted minorCategoryIds:", minorCategoryIds);

    const formData = new FormData();
    formData.append("cityId", cityId);
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("amount", amount); // Append amount
    formData.append("fee", fee);
    formData.append("contactInfo", contactInfo);
    formData.append("isNegotiable", isNegotiable); // Append 협의필요 state
    formData.append("isMinimumAmount", isMinimumAmount); // Append 최소금액부터 state
    formData.append("minorCategoryIds", JSON.stringify(minorCategoryIds)); // Convert to JSON string

    if (images.length > 0) {
      images.forEach((image, index) => {
        formData.append("images", image);
        if (index === thumbnailIndex) {
          formData.append("thumbnailIndex", index);
        }
      });
    } else {
      formData.append("thumbnailIndex", -1); // Indicate no thumbnail selected
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch("http://localhost:5001/jobs", {
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
    setAmount(""); // Clear amount when 협의필요 is selected
  };

  const handleMinimumAmountChange = () => {
    setIsNegotiable(false);
    setIsMinimumAmount(true);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;
    if (isMinimumAmount && value && !value.endsWith("~")) {
      value += "~";
    }
    setAmount(value);
  };

  return (
    <>
      <Header />
      <div className={styles.section}>
        <h1 className={styles.title}>작업 등록</h1>
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
                placeholder="작업 공고의 제목을 입력하세요"
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
                className={`${styles.inputValue} ${styles.noSpinner}`}
                value={amount}
                onChange={handleAmountChange}
                disabled={isNegotiable}
                required={!isNegotiable}
                placeholder="금액을 입력하세요"
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
                className={`${styles.inputValue} ${styles.noSpinner}`}
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                required
                placeholder="0에서 100 사이의 숫자를 입력하세요"
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
              <input
                id="images"
                type="file"
                className={styles.inputValue}
                onChange={handleImageChange}
                multiple
              />
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
