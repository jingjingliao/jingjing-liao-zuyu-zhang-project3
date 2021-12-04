const express = require("express");
const router = express.Router();
// const PokemonAccessor = require("./models/Pokemon.Model");

const jobs = [
  {
    JobID: 1,
    JobTitle: "Software Engineer",
    Location: "Bellevue",
    CompanyName: "Company1",
  },
  {
    JobID: 2,
    JobTitle: "soft Drink Seller",
    Location: "Redmond",
    CompanyName: "Company2",
  },
  {
    JobID: 3,
    JobTitle: "Software Engineer",
    Location: "Seattle",
    CompanyName: "Company3",
  },
];

router.get("/findAll", function (req, res) {
  return res.status(200).send(jobs);
});

router.get("/find/:jobName", function (req, res) {
  const jobQuery = req.params.jobName;
  let foundJobs = [];
  for (let job of jobs) {
    if (job.JobTitle.toLowerCase().includes(jobQuery.toLowerCase())) {
      foundJobs.push(job);
    }
  }
  // return res.status(200).send(foundJobs);
  if (!foundJobs) {
    res.send("No job matches");
  }

  return res.send(foundJobs);
});

router.get("/job/:jobId", function (req, res) {
  const jobID = req.params.jobId;
  let foundJob = null;
  for (let job of jobs) {
    if (job.JobID == jobID) {
      foundJob = job;
    }
  }
  return res.send(foundJob);
});

// router.post("/create", (req, res) => {
//   const { name, health } = req.body;
//   if (!name || !health) {
//     return res.status(422).send("Missing data");
//   }
//   return PokemonAccessor.findPokemonByName(name).then((pokemonResponse) => {
//     if (pokemonResponse.length) {
//       res.status(402).send("Pokemon with that name already existed");
//     } else {
//       return PokemonAccessor.insertPokemon(req.body)
//         .then((pokemonResponse) => res.status(200).send(pokemonResponse))
//         .catch((error) => res.status(400).send(error));
//     }
//   });
// });

module.exports = router;
