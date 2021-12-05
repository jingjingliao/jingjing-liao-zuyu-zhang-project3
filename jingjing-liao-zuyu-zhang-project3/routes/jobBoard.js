const express = require("express");
const router = express.Router();
const JobAccessor = require("./models/Job.Model");
// const PokemonAccessor = require("./models/Pokemon.Model");

// const jobs = [
//   {
//     JobID: 1,
//     JobTitle: "Software Engineer",
//     Location: "Bellevue",
//     CompanyName: "Company1",
//   },
//   {
//     JobID: 2,
//     JobTitle: "soft Drink Seller",
//     Location: "Redmond",
//     CompanyName: "Company2",
//   },
//   {
//     JobID: 3,
//     JobTitle: "Software Engineer",
//     Location: "Seattle",
//     CompanyName: "Company3",
//   },
// ];

router.get("/findAll", function (request, response) {
  return JobAccessor.getAllJob()
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Need to be modified
router.get("/find/:jobTitle", function (request, response) {
  const jobTitle = request.params.jobTitle;
  return JobAccessor.findJobByJobTitle(jobTitle)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// router.get("/find/:jobName", function (req, res) {
//   const jobQuery = req.params.jobName;
//   let foundJobs = [];
//   for (let job of jobs) {
//     if (job.JobTitle.toLowerCase().includes(jobQuery.toLowerCase())) {
//       foundJobs.push(job);
//     }
//   }
//   if (!foundJobs) {
//     res.send("No job matches");
//   }
//   return res.send(foundJobs);
// });

router.get("/job/:jobId", function (request, response) {
  return JobAccessor.findJobById(request.params.jobId)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.delete("/job/:jobId", function (request, response) {
  return JobAccessor.deleteJobById(request.params.jobId)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.delete("/job/deleteAll", function (request, response) {
  return JobAccessor.deleteAll()
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
  } = request.body;
  if (!jobTitle || !companyName || !location || !description || !emailContact) {
    return response.status(422).send("Missing data");
  }

  return JobAccessor.insertJob(request.body)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

module.exports = router;
