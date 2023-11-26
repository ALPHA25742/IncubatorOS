import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import WeeklyUpdateInfo from "./components/WeeklyUpdateInfo";
import WeeklyUpdateForm from "./components/WeeklyUpdateForm";
import Curriculum from "./components/Curriculum";
import { useState } from "react";

export default function PermanentDrawerLeft() {
  const [activePane, setActivePane] = useState("WeeklyUpdate");
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box sx={{ width: 240, height: "100dvh" }}>
        <Box sx={{ position: "fixed", width:"100%" }}>
          <List>
            {["WeeklyUpdate", "Curriculum"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setActivePane(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box flex={1} sx={{ borderLeft: "solid #e1e1e1" }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography
              variant="h3"
              noWrap
              component="h2"
              sx={{ color: "background.default" }}
            >
              {activePane}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ bgcolor: "background.default", p: 3 }}>
          {activePane == "WeeklyUpdateForm" ? (
            <WeeklyUpdateForm setActivePane={setActivePane} />
          ) : activePane == "WeeklyUpdate" ? (
            <WeeklyUpdateInfo setActivePane={setActivePane} />
          ) : (
            <Curriculum />
          )}
        </Box>
      </Box>
    </Box>
  );
}
