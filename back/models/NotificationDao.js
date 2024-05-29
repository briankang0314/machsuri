const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const NotificationDao = {
  createNotification: async (notificationData) => {
    console.log("(NotificationDao)Creating notification...");
    console.log("Notification data:", notificationData);

    try {
      const result = await prisma.notification.create({
        data: {
          user_id: notificationData.userId,
          message: notificationData.message,
          type: notificationData.type || "info",
          is_read: false,
          created_at: new Date(),
        },
      });
      return result;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  },
  getNotificationsByUserId: async (userId) => {
    console.log("Fetching notifications for user:", userId);
    const result = await prisma.notification.findMany({
      where: { user_id: parseInt(userId) },
      orderBy: { created_at: "desc" },
    });
    console.log("Notifications fetched:", result);
    if (result.length === 0) {
      console.log("No notifications found for user:", userId);
    }
    return result;
  },
  markAsRead: async (notificationId) => {
    console.log("Marking notification as read:", notificationId);
    const result = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
    console.log("Notification marked as read:", result);
    return result;
  },
};

module.exports = NotificationDao;
