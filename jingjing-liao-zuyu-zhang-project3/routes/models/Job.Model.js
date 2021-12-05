const mongoose = require("mongoose");
const JobSchema = require("../schema/Job.Schema").JobSchema;

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
  return JobModel.create(job);
}

function getAllJob() {
  return JobModel.find().exec();
}

function findJobByJobTitle(jobTitle) {
  return JobModel.find({ jobTitle: jobTitle }).exec();
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

// Make sure to export a function after you create it!
module.exports = {
  insertJob,
  getAllJob,
  findJobByJobTitle,
  findJobById,
  deleteJobById,
  deleteAll,
};
