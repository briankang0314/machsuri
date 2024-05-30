import React, { useState } from "react";
import { SERVER_PORT } from "../../config";
import styles from "./Notification.module.scss";

function Notification({ notifications, onNotificationRead }) {
  const [error, setError] = useState("");

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`${SERVER_PORT}/notifications/${notificationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const updatedNotifications = notifications.filter(
        (n) => n.id !== notificationId
      );
      onNotificationRead(updatedNotifications);
    } catch (error) {
      console.error("Failed to mark notification as read", error);
      setError("Failed to mark notification as read");
    }
  };

  return (
    <div className={styles.notification}>
      <h2>알림</h2>
      {error && <div className={styles.error}>{error}</div>}
      <ul>
        {notifications.map((notification) => {
          const [firstPart, ...rest] = notification.message.split(". ");
          const secondPart = rest.join(": "); // Re-join the rest if there are multiple colons
          return (
            <li key={notification.id} className={styles.notificationItem}>
              <span className={styles.message}>
                {firstPart}
                <br />
                {secondPart}
              </span>
              <button onClick={() => markAsRead(notification.id)}>
                읽음 처리
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Notification;
