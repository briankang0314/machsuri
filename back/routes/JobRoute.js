const express = require("express");
const router = express.Router();
const multer = require("multer");
const JobController = require("../controllers/JobController");
const userValidateToken = require("../middleware/userValidateToken");
const roleCheck = require("../middleware/roleCheck");
const verifyJobPoster = require("../middleware/verifyJobPoster");
const UploadService = require("../services/UploadService");

// Configure multer storage and file handling
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only images are allowed!"), false);
    }
  },
});

// Define multer fields configuration
const uploadFields = upload.fields([{ name: "images", maxCount: 5 }]);

// Middleware to handle image uploads
const handleImageUploads = async (req, res, next) => {
  try {
    if (req.files && req.files.images) {
      const uploadPromises = req.files.images.map((file) =>
        UploadService.uploadToStorage(file)
      );
      const imageUrls = await Promise.all(uploadPromises);
      req.body.images = req.body.images = imageUrls;
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Route to post a new job.
router.post(
  "/",
  userValidateToken,
  roleCheck(["general", "admin"]),
  uploadFields,
  handleImageUploads,
  JobController.postJob
);

// Route to retrieve job postings with optional filters.
// Open to all users without authentication.
router.get("/all", JobController.findJobs);

// Route to retrieve a job posting by its ID.
// Open to all users without authentication.
router.get("/:jobId", JobController.findJobById);

// Route to update an existing job posting.
router.put(
  "/:jobId",
  userValidateToken,
  verifyJobPoster,
  JobController.updateJob
);

// Route to update the status of a job posting.
router.put(
  "/:jobId/status",
  userValidateToken,
  verifyJobPoster,
  JobController.updateJobStatus
);

// Route to update the location of a job posting.
router.put(
  "/:jobId/location",
  userValidateToken,
  verifyJobPoster,
  JobController.updateJobLocation
);

// Route to soft delete a job posting.
router.put(
  "/:jobId/delete",
  userValidateToken,
  verifyJobPoster,
  JobController.softDeleteJob
);

// Route to delete a job posting.
router.delete(
  "/:jobId",
  userValidateToken,
  verifyJobPoster,
  JobController.deleteJob
);

module.exports = router;
