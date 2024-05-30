const NotificationService = require("../services/NotificationService");

const NotificationController = {
  createNotification: async (req, res) => {
    console.log("Request body:", req.body);
    const { userId, type, message } = req.body;
    try {
      console.log("(NotificationController)Creating notification...");
      const notification = await NotificationService.createNotification(
        userId,
        type,
        message
      );
      console.log("Notification created:", notification);
      res.status(201).json(notification);
    } catch (error) {
      console.error("Failed to create notification:", error);
      res.status(500).json({ message: "Failed to create notification" });
    }
  },
  getNotifications: async (req, res) => {
    const userId = req.params.userId;
    try {
      console.log("Fetching notifications for user:", userId);
      const notifications = await NotificationService.getUserNotifications(
        userId
      );
      console.log("Notifications fetched:", notifications);
      res.status(200).json(notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  },
  markAsRead: async (req, res) => {
    const notificationId = req.params.notificationId;
    try {
      console.log("Marking notification as read:", notificationId);
      const notification = await NotificationService.markNotificationAsRead(
        notificationId
      );
      console.log("Notification marked as read:", notification);
      res.status(200).json(notification);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  },
};

module.exports = NotificationController;
