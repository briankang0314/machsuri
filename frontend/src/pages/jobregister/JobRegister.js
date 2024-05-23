import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [selectedMinorCategory, setSelectedMinorCategory] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [fee, setFee] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [cityId, setCityId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(null);

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
    console.log("Handling job post submission...");

    // Validate fee
    const feeValue = parseInt(fee, 10);
    if (isNaN(feeValue) || feeValue < 0 || feeValue > 100) {
      setErrorMessage("수수료 입력값을 확인해주세요");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cityId", cityId);
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("fee", fee);
      formData.append("contactInfo", contactInfo);
      formData.append("minorCategoryIds", selectedMinorCategory);

      // Append images to formData
      images.forEach((image, index) => {
        formData.append("images", image);
        if (index === thumbnailIndex) {
          formData.append("thumbnailIndex", index);
        }
      });

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
    }
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
              <label className={styles.inputName} htmlFor="description">
                설명
              </label>
              <input
                id="description"
                className={styles.inputValue}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                placeholder="작업에 대한 설명을 입력하세요"
              />
            </div>
            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="fee">
                수수료
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
              <label className={styles.inputName} htmlFor="minorCategory">
                부수 카테고리
              </label>
              <select
                id="minorCategory"
                className={styles.inputValue}
                value={selectedMinorCategory}
                onChange={(e) => setSelectedMinorCategory(e.target.value)}
                required
                disabled={!selectedMajorCategory}
              >
                <option value="">부수 카테고리를 선택해주세요</option>
                {minorCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* New input for image uploads */}
            <div className={styles.inputBox}>
              <label className={styles.inputName} htmlFor="images">
                이미지 업로드
              </label>
              <input
                id="images"
                type="file"
                className={styles.inputValue}
                onChange={handleImageChange}
                multiple
              />
            </div>

            {/* New input for selecting thumbnail with preview */}
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

            {errorMessage && (
              <div className={styles.invalidInput}>{errorMessage}</div>
            )}
            <button type="submit" className={styles.submitBtn}>
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

// const handleJobPost = async (e) => {
//   e.preventDefault();
//   console.log("Handling job post submission...");

//   try {
//     const response = await fetch("http://localhost:5001/jobs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//       body: JSON.stringify({
//         cityId,
//         title,
//         summary,
//         fee,
//         contactInfo,
//         minorCategoryIds: [selectedMinorCategory],
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       if (errorData.message === "TOKEN_EXPIRED") {
//         console.error("Token expired, please log in again.");
//         setErrorMessage("Your session has expired. Please log in again.");
//         // Optionally, redirect to login page
//         navigate("/login");
//       } else {
//         console.error("Error response from server:", errorData);
//         throw new Error(errorData.message || "Job post failed.");
//       }
//     }

//     console.log("Job post successful, navigating to /jobs");
//     navigate("/"); // Navigate to the job listings page
//   } catch (error) {
//     setErrorMessage(error.message);
//     console.error("Job post failed:", error);
//   }
// };
