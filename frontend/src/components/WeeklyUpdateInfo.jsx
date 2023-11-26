import { Button, Typography } from "@mui/material";
import React from "react";

export default function WeeklyUpdateInfo({ setActivePane }) {
  return (
    <>
      <Typography paragraph sx={{padding:"20px 500px 0 50px"}}>
        Welcome to Incubator OS! Let's get started by submitting your weekly
        update. <br /> These updates will help you keep track of your progress
        over time. We ask you to track what we have found to be important to
        many founders, such as whether you are launched, a primary metric, and
        the number of customers you have spoke to. If you havent laucnhed yet
        your primary metric should be "weeks to launch". If you are having
        difficulty understanding or selecting a metric to track, check out the
        video lecture.<a>how to set KPI's and Goals</a>An update should take
        at-most 5-15 minutes to complete
      </Typography>

      <Typography paragraph sx={{padding:"0 500px 30px 50px"}}>
        Note that if your company has more than one founder, only ONE founder
        needs to submit the weeklu update. You wont be able to submit another
        update for the week if your co-founder has already submitted one.
        However you can edit it anytime during the week.
      </Typography>
      <Button
        variant="contained"
        onClick={() => setActivePane("WeeklyUpdateForm")}
        sx={{ padding: "10px 50px",margin:"0 50px 0"}}
      >
        Submit your update!
      </Button>
    </>
  );
}
