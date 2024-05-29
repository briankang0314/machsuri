const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const NotificationDao = {
  createNotification: async (notificationData) => {
    console.log("Creating notification...");
    console.log("Notification data:", notificationData);
    const result = await prisma.notification.create({
      data: notificationData,
    });
    console.log("Notification created:", result);
    return result;
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
