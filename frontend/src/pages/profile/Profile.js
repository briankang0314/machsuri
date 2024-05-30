import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./Profile.module.scss";
import { SERVER_PORT } from "../../config";

function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState({});
  const [region, setRegion] = useState({});

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
          setProfile(data);
          fetchCityAndRegion(data.city_id);
        } else {
          setError(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    const fetchCityAndRegion = async (cityId) => {
      try {
        const cityResponse = await fetch(
          `${SERVER_PORT}/locations/cities/${parseInt(cityId, 10)}`
        );
        const cityData = await cityResponse.json();
        if (cityResponse.ok) {
          setCity(cityData);
          const regionResponse = await fetch(
            `${SERVER_PORT}/locations/regions/${cityData.region_id}`
          );
          const regionData = await regionResponse.json();
          if (regionResponse.ok) {
            setRegion(regionData);
          }
        }
      } catch (error) {
        setError("Failed to fetch city and region");
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <main className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <img
            src={
              SERVER_PORT + profile.profile_image_url ||
              "/images/profile/profile_sample.svg"
            }
            alt="Profile"
            className={styles.profileImage}
          />
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.profileField}>
            <strong>카카오톡 오픈챗 대화명:</strong>{" "}
            <span>{profile.openchat_name}</span>
          </div>
          <div className={styles.profileField}>
            <strong>상호명:</strong> <span>{profile.business_name}</span>
          </div>
          <div className={styles.profileField}>
            <strong>전화번호:</strong> <span>{profile.phone_number}</span>
          </div>
          <div className={styles.profileField}>
            <strong>지역:</strong> <span>{region.name}</span>
          </div>
          <div className={styles.profileField}>
            <strong>도시:</strong> <span>{city.name}</span>
          </div>
        </div>
        <button
          className={styles.editProfileButton}
          onClick={() => navigate(`/users/profile/${userId}/edit`)}
        >
          프로필 수정
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
