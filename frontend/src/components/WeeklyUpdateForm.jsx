import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useRef, useState } from "react";
import { Divider, Typography } from "@mui/material";
import { useUser } from "../context/UserContext.jsx";

export default function WeeklyUpdateForm({ setActivePane }) {
  const weeksToLaunch = useRef(0);
  const usersContactedLastWeek = useRef();
  const userLearnings = useRef();
  const moraleRating = useRef();
  const primaryMetricImprovement = useRef();
  const biggestObstacle = useRef();
  const Goal = useRef();
  const followerName = useRef();
  const followerMail = useRef();
  const { user } = useUser();
  const [nextWeekGoals, setNextWeekGoals] = useState([]);
  const [followers, setFollowers] = useState([]);

  const [launched, setLaunched] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      startup: user.startup,
      launch: {
        launched,
        weeksToLaunch: !launched ? weeksToLaunch.current.value : 0,
      },
      users: {
        contactedlastWeek: usersContactedLastWeek.current.value,
        learnings: userLearnings.current.value,
      },
      goalsAndMorale: {
        moraleRating: moraleRating.current.value,
        primaryMetricImprovement: primaryMetricImprovement.current.value,
        biggestObstacle: biggestObstacle.current.value,
        nextWeekGoals,
      },
      followers,
    };
    const submitWeeklyUpdate = await fetch(
      import.meta.env.VITE_REACT_APP_backendURL + "/user/submitWeeklyUpdate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      }
    );
    const res = await submitWeeklyUpdate.json();
    setActivePane("WeeklyUpdate");
    if (res !== "submission successful") window.alert(res);
    else window.alert(res);
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        m: "25px 20%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">Launch</Typography>
      <FormGroup sx={{ m: "0 0 60px", flexDirection: "row" }}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={launched}
              onChange={() => setLaunched(!launched)}
            />
          }
          label="Are you launched?"
          labelPlacement="start"
          flex={1}
          sx={{ m: "0 15px 0 0" }}
        />
        {!launched && (
          <Box flex={1} sx={{ display: "flex", flexDirection: "column" }}>
            <FormLabel>Weeks to launch</FormLabel>
            <TextField
              required
              type="number"
              id="outlined-required"
              inputRef={weeksToLaunch}
            />
          </Box>
        )}
      </FormGroup>
      <Typography variant="h6">Users</Typography>
      <FormGroup sx={{ m: "0 0 60px", flexDirection: "row" }}>
        <Box
          flex={1}
          sx={{ display: "flex", flexDirection: "column", m: "0 25px 0 0" }}
        >
          <FormLabel sx={{ marginTop: "20px" }}>
            Users/prospoective users talked to in the last week
          </FormLabel>
          <TextField
            required
            type="number"
            id="outlined-required"
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={usersContactedLastWeek}
          />
        </Box>
        <Box flex={1} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel sx={{ marginTop: "20px" }}>
            What have you learned from them?
          </FormLabel>
          <TextField
            id="outlined-required"
            inputRef={userLearnings}
            multiline
          />
        </Box>
      </FormGroup>
      <Typography variant="h6">Goals and Morale</Typography>
      <FormGroup sx={{ m: "0 0 30px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormLabel sx={{ marginTop: "20px" }}>
            On a scale of 1-10 what is your morale?
          </FormLabel>
          <TextField
            required
            type="number"
            id="outlined-required"
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={moraleRating}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", m: "0 25px 0 0" }}
            flex={1}
          >
            <FormLabel sx={{ marginTop: "20px" }}>
              What most improved your primary metric?
            </FormLabel>
            <TextField
              id="outlined-required"
              inputRef={primaryMetricImprovement}
              multiline
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }} flex={1}>
            <FormLabel sx={{ marginTop: "20px" }}>Biggest obstacle?</FormLabel>
            <TextField
              id="outlined-required"
              inputRef={biggestObstacle}
              multiline
            />
          </Box>
        </Box>
        {/* {nextWeekGoals.length !== 0 &&
            nextWeekGoals.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box flex={1} sx={{ display: "flex", flexDirection: "column" }}>
            <FormLabel>
              What are your top 1-3 goals for the next week?
            </FormLabel>

            <TextField id="outlined-required" inputRef={Goal} />
          </Box>

          <Button
            variant="contained"
            sx={{ padding: "15px 50px",m:"20px 0 0 10px" }}
            onClick={() =>
              setNextWeekGoals([...nextWeekGoals, Goal.current.value])
            }
          >
            Add Goal
          </Button>
        </Box>
      </FormGroup>
      <Typography variant="h6">My followers</Typography>
      <FormGroup sx={{ m: "0 0 30px" }}>
        <p>
          Followers will get an email every time you submit a new update. They
          will also be able to see your past updates and progress over time.
          Followers could be investors, advisors, other peer founders or even
          family members <br />
          Having followers will help you get more done each week. <br />
          We recomment you have at least one follower!
        </p>
        {followers.length !== 0 &&
          followers.map((f) => (
            <ListItem key={f.name} disablePadding>
              <ListItemText primary={`${f.name} - ${f.email}`} />
            </ListItem>
          ))}
        <Box
          sx={{
            display: "flex",
            mt: "20px",
          }}
        >
          <TextField
            id="outlined-required"
            label="Name"
            inputRef={followerName}
            sx={{ flexGrow: "1", m: "0 10px 0 0" }}
          />
          <TextField
            id="outlined-required"
            label="Email"
            inputRef={followerMail}
            sx={{ flexGrow: "1", m: "0 10px 0 0" }}
          />
          <Button
            variant="contained"
            sx={{ padding: "10px 50px" }}
            onClick={() =>
              setFollowers([
                ...followers,
                {
                  name: followerName.current.value,
                  email: followerMail.current.value,
                },
              ])
            }
          >
            Add Follower
          </Button>
        </Box>
      </FormGroup>
      <Divider />
      <Button
        variant="contained"
        type="submit"
        sx={{ padding: "15px 75px", m: "20px 0" }}
      >
        Submit
      </Button>
    </Box>
  );
}
