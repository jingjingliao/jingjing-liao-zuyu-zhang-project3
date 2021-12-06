const mongoose = require("mongoose");
const JobSchema = require("../schema/Job.Schema").JobSchema;

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
  return JobModel.create(job);
}

function getAllJob() {
  return JobModel.find().exec();
}

async function findJobByJobTitle(jobTitle) {
  return await JobModel.find({
    jobTitle: { $regex: jobTitle, $options: "i" },
  }).exec();
}

function findJobById(jobId) {
  return JobModel.findById(jobId).exec();
}

function deleteJobById(jobId) {
  return JobModel.deleteOne({ jobId: jobId }).exec();
}

function deleteAll() {
  return JobModel.deleteAll().exec();
}

module.exports = {
  insertJob,
  getAllJob,
  findJobByJobTitle,
  findJobById,
  deleteJobById,
  deleteAll,
};
