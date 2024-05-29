import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./EditProfile.module.scss";
import { SERVER_PORT } from "../../config";

function EditProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        navigate("/users/login");
        return;
      }

      try {
        const response = await fetch(`${SERVER_PORT}/users/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log("Fetched profile data:", data);
          setProfile(data);
          setSelectedRegion(data.region_id);
          setSelectedCity(data.city_id);
        } else {
          setError(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchRegions();
  }, [userId, navigate]);

  const fetchRegions = async () => {
    try {
      const response = await fetch(`${SERVER_PORT}/locations/regions`);
      const data = await response.json();
      if (response.ok) {
        console.log("Fetched regions data:", data);
        setRegions(data);
      } else {
        console.error("Failed to fetch regions");
      }
    } catch (error) {
      console.error("Failed to fetch regions", error);
    }
  };

  const handleRegionChange = async (e) => {
    const regionId = e.target.value;
    console.log("Selected region ID:", regionId);
    setSelectedRegion(regionId);
    fetchCities(regionId);
  };

  const fetchCities = async (regionId) => {
    try {
      const response = await fetch(
        `${SERVER_PORT}/locations/regions/${regionId}/cities`
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Fetched cities data for region", regionId, ":", data);
        setCities(data);
      } else {
        console.error("Failed to fetch cities");
      }
    } catch (error) {
      console.error("Failed to fetch cities", error);
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    console.log("Selected city ID:", cityId);
    setSelectedCity(cityId);
    setProfile((prevProfile) => ({
      ...prevProfile,
      city: { id: cityId, region_id: selectedRegion },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed - Name:", name, "Value:", value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const accessToken = localStorage.getItem("access_token");

    try {
      console.log("Submitting profile data:", profile);
      const response = await fetch(`${SERVER_PORT}/users/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Profile updated successfully");
        setSuccess(
          "프로필 수정이 완료되었습니다. 잠시 후 프로필 페이지로 이동합니다."
        );
        setTimeout(() => {
          navigate(`/users/profile/${userId}`);
        }, 500);
      } else {
        console.error("Failed to update profile:", data.message);
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <main className={styles.editProfileContainer}>
        <h1>프로필 수정</h1>
        {success && <div className={styles.success}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>카카오톡 오픈챗 대화명</label>
            <input
              type="text"
              name="openchat_name"
              value={profile.openchat_name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>상호명</label>
            <input
              type="text"
              name="business_name"
              value={profile.business_name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>전화번호</label>
            <input
              type="text"
              name="phone_number"
              value={profile.phone_number || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>지역</label>
            <select
              name="region_id"
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
          <div className={styles.formGroup}>
            <label>도시</label>
            <select
              name="city_id"
              value={selectedCity}
              onChange={handleCityChange}
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
          <button type="submit" className={styles.submitButton}>
            변경사항 저장
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default EditProfile;
