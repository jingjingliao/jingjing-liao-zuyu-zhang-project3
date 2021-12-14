const express = require("express");
const router = express.Router();
const JobAccessor = require("./models/Job.Model");
const alert = require("alert");

router.get("/findAll", function (request, response) {
  return JobAccessor.getAllJob()
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.get("/find/:jobTitle", async function (request, response) {
  try {
    const jobTitle = request.params.jobTitle;
    const jobResponse = await JobAccessor.findJobByJobTitle(jobTitle);

    response.status(200).send(jobResponse);
  } catch (err) {
    response.status(400).send(error);
  }
});

router.get("/:jobId", async function (request, response) {
  try {
    const jobId = request.params.jobId;
    const jobResponse = await JobAccessor.findJobById(jobId);
    response.status(200).send(jobResponse);
  } catch (err) {
    response.status(400).send(err);
  }
});

router.post("/getJobObjects", function (request, response) {
  try {
    const favArr = request.body;
    const jobObjectArr = [];
    for (let jobId of favArr) {
      const jobResponse = JobAccessor.findJobById(jobId);
      jobObjectArr.push(jobResponse);
      response.status(200).send(jobObjectArr);
    }
  } catch (err) {
    response.status(400).send(err);
  }
});

router.put("/edit/:jobId", function (request, response) {
  const {
    jobTitle,
    companyName,
    location,
    description,
    emailContact,
    companyWebsite,
    companyIcon,
  } = request.body;

  if (
    !jobTitle ||
    !companyName ||
    !location ||
    !description ||
    !emailContact ||
    !companyIcon
  ) {
    alert(
      "Except Company Website, all other information should be required when editting!"
    );
    return response.status(422).send("Missing data");
  }

  return JobAccessor.updateById(request.params.jobId, request.body)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.post("/create", (request, response) => {
  const {
    jobTitle,
    companyName,
    location,
    description,
    emailContact,
    companyWebsite,
    creator,
    companyIcon,
  } = request.body;
  if (
    !jobTitle ||
    !companyName ||
    !location ||
    !description ||
    !emailContact ||
    !companyIcon
  ) {
    alert(
      "Except Company Website, all other information should be required when creating!"
    );
    return response.status(422).send("Missing data");
  }

  return JobAccessor.insertJob(request.body)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.delete("/:jobId", function (request, response) {
  alert("Successfully deleting this Job!");
  return JobAccessor.deleteJobById(request.params.jobId)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

module.exports = router;
