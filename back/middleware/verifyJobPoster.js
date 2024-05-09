const errorGenerator = require("../utils/errorGenerator");
const JobService = require("../services/JobService");

const verifyJobPoster = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await JobService.findJobById(jobId);
    console.log("Job retrieved by verifyJobPoster:", job);
    if (!job) {
      throw errorGenerator({ statusCode: 404, message: "JOB_NOT_FOUND" });
    }
    if (req.user.id !== job.user_id && req.user.role !== "admin") {
      throw errorGenerator({ statusCode: 403, message: "UNAUTHORIZED_ACCESS" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyJobPoster;
