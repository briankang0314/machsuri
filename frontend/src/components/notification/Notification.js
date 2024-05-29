import React, { useEffect, useState } from "react";
import { SERVER_PORT } from "../../config";
import styles from "./Notification.module.scss";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${SERVER_PORT}/notifications/${localStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNotifications(data);
      } else {
        setError("Failed to fetch notifications");
      }
    } catch (error) {
      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`${SERVER_PORT}/notifications/${notificationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setNotifications(notifications.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.notification}>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className={styles.notificationItem}>
            {notification.message}
            <button onClick={() => markAsRead(notification.id)}>
              Mark as Read
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
