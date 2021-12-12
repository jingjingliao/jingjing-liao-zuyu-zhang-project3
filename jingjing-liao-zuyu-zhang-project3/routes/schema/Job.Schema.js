const Schema = require("mongoose").Schema;

exports.JobSchema = new Schema(
  {
    jobTitle: String,
    companyName: String,
    location: String,
    description: String,
    emailContact: String,
    companyWebsite: {
      type: String,
      default: "",
    },
    creator: String,
    createAt: {
      type: Date,
      default: new Date(),
    },
    companyIcon: String,
  },
  { collection: "jobs" }
);
