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

router.get("/find/:jobTitle", async function (request, response) {
  try {
    const jobTitle = request.params.jobTitle;
    const jobResponse = await JobAccessor.findJobByJobTitle(jobTitle);
    response.status(200).send(jobResponse);
  } catch (err) {
    response.status(400).send(error);
  }
});

router.get("/:jobId", function (request, response) {
  return JobAccessor.findJobById(request.params.jobId)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.delete("/:jobId", function (request, response) {
  return JobAccessor.deleteJobById(request.params.jobId)
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
