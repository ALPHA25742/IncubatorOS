import userModel from "../models/user.js";
import weeklyUpdateModel from "../models/weeklyUpdates.js";
import express from "express";
import { createToken } from "../app.js";
import { getISOWeek } from "date-fns";
const router = express.Router();
const currentWeek = getISOWeek(new Date());

router.post("/", async (req, res) => {
  try {
    const query = await userModel.findOne(req.body).select("_id startup");
    if (query) {
      const token = createToken(query._id);
      res.json({ token, startup: query.startup });
    } else {
      res.json("proceed");
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/signup", (req, res) => {
  try {
    userModel.create(req.body).then((result) => {
      const token = createToken(result._id);
      res.json({ token, startup: result.startup });
    });
  } catch (err) {
    res.json(err);
  }
});

router.post("/submitWeeklyUpdate", async(req, res) => {
  try {
    const query = await weeklyUpdateModel(currentWeek)
      .findOne({ startup: req.body.startup })
      .select("startup");
    if (query) {
      res.json("u have already submitted the update for the week");
    } else {
      weeklyUpdateModel(currentWeek)
        .create(req.body)
        .then((result) => res.json("submission successful"));
    }
  } catch (err) {
    res.json(err);
  }
});

export default router;
