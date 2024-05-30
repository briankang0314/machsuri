const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");

router.post("/", NotificationController.createNotification);
router.get("/:userId", NotificationController.getNotifications);
router.put("/:notificationId", NotificationController.markAsRead);

module.exports = router;
