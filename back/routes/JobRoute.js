const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");
const userValidateToken = require("../middleware/userValidateToken");
const roleCheck = require("../middleware/roleCheck");
const verifyJobPoster = require("../middleware/verifyJobPoster");
const multer = require("multer");
const AWS = require("aws-sdk");

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Set up multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to upload file to S3
const uploadFile = (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `job_post_images/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise();
};

// Route to post a new job.
router.post(
  "/",
  userValidateToken,
  roleCheck(["general", "admin"]),
  upload.array("images", 5),
  async (req, res, next) => {
    try {
      const uploadPromises = req.files.map((file) => uploadFile(file));
      const results = await Promise.all(uploadPromises);
      const imageUrls = results.map((result) => result.Location);

      // Proceed to the job posting logic
      req.body.images = imageUrls; // Attach image URLs to request body
      next();
    } catch (error) {
      console.error("Error uploading files to S3:", error);
      res.status(500).send("Error uploading files");
    }
  },
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

router.post(
  "/:jobId/images",
  userValidateToken,
  verifyJobPoster,
  upload.array("images", 5),
  JobController.addJobImages
);

router.get(
  "/:jobId/images",
  userValidateToken,
  verifyJobPoster,
  JobController.getJobImages
);
router.delete(
  "/:jobId/images",
  userValidateToken,
  verifyJobPoster,
  JobController.deleteJobImages
);

module.exports = router;
