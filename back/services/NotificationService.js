const NotificationDao = require("../models/NotificationDao");

const NotificationService = {
  createNotification: async (userId, type, message) => {
    console.log("Creating notification...");
    const notificationData = { userId, type, message };
    const notification = await NotificationDao.createNotification(
      notificationData
    );
    console.log("Notification created:", notification);
    return notification;
  },
  getUserNotifications: async (userId) => {
    console.log("Getting user notifications...");
    const notifications = await NotificationDao.getNotificationsByUserId(
      userId
    );
    console.log("User notifications:", notifications);
    return notifications;
  },
  markNotificationAsRead: async (notificationId) => {
    console.log("Marking notification as read...");
    const result = await NotificationDao.markAsRead(notificationId);
    console.log("Notification marked as read:", result);
    return result;
  },
};

module.exports = NotificationService;
