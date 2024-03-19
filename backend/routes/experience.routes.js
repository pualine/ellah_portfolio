import { Router } from "express";
import db from "../db/connection";
import { ObjectId } from "mongodb";

const router = Router();
const SKILLS_COLLECTION = db.collection("Experience");

// ENDPOINT FOR GETING ALL EXPERIENCE
router.get("/", async (req, res) => {
  let result = await SKILLS_COLLECTION.find().toArray;
  res.send(result).status(200);
});

// ENDPOINT FOR GETING SINGLE EXPERIENCES
router.get("/:id", async (req, res) => {
  let query = {
    _id: new ObjectId(req.params.id),
  };
  let singleResult = await SKILLS_COLLECTION.findOne(query);
  res.send(singleResult).status(200);

  if (!singleResult) res.send("RESULT NOT FOUND").status(404);
  else res.send(singleResult).status(200);
});

// ENDPOINT FOR MAKING POST
router.post("/", async (req, res) => {
  try {
    let newExperience = {
      experience: req.body.experience,
      date: req.body.date,
      company: req.body.company,
      location: req.body.location
    };
    let result = await SKILLS_COLLECTION.insertOne(newExperience);
    res.send(result).status(201);
  } catch (error) {
    console.log("SORRY CANNOT GET DATA", error);
  }
});

// ENDPOINT FOR UPDATING POST
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        experience: req.body.experience,
        date: req.body.date,
        company: req.body.company,
        location: req.body.location
      },
    };

    let result = await SKILLS_COLLECTION.updateOne(query, update);
    res.send(result).status(201);
  } catch (error) {
    console.log("SORRY TRY AGAIN", error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await SKILLS_COLLECTION.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.log("SORRY TRY AGAIN");
  }
});

export default router;
