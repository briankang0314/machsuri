const errorGenerator = require("../utils/errorGenerator");
const JobService = require("../services/JobService");

const verifyJobPoster = async (req, res, next) => {
  const jobId = req.params.jobId;
  const userId = req.user.id;
  const userRole = req.user.role;

  console.log(
    `verifyJobPoster called with jobId: ${jobId}, userId: ${userId}, userRole: ${userRole}`
  );

  try {
    console.log(`Attempting to find job with ID: ${jobId}`);
    const job = await JobService.findJobById(jobId);
    console.log(`Job retrieved by verifyJobPoster:`, job);

    if (!job) {
      console.log(`Job not found with ID: ${jobId}`);
      throw errorGenerator({ statusCode: 404, message: "JOB_NOT_FOUND" });
    }

    if (userId !== job.user_id && userRole !== "admin") {
      console.log(
        `Unauthorized access attempt by userId: ${userId}, job user_id: ${job.user_id}, userRole: ${userRole}`
      );
      throw errorGenerator({ statusCode: 403, message: "UNAUTHORIZED_ACCESS" });
    }

    console.log(`User ${userId} is authorized to access job ${jobId}`);
    next();
  } catch (err) {
    console.log(`Error in verifyJobPoster: ${err.message}`, {
      stack: err.stack,
    });
    next(err);
  }
};

module.exports = verifyJobPoster;
