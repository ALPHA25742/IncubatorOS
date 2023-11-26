import mongoose from "mongoose";

const weeklyUpdateSchema = new mongoose.Schema(
  {
    startup: String,
    launch: {
      launched: Boolean,
      weeksToLaunch: Number,
    },
    users: {
      contactedlastWeek: Number,
      learnings: String,
    },
    goalsAndMorale: {
      moraleRating: Number,
      primaryMetricImprovement: String,
      biggestObstacle: String,
      nextWeekGoals: [String],
    },
    followers: [
      {
        name: String,
        email: String,
      },
    ],
  },
  { timestamps: true }
);

export default function weeklyUpdate(x) {
  return mongoose.model(`week${x}update`, weeklyUpdateSchema);
}
