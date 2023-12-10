import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { signInWithGoogle } from "../Firebase";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { Stack } from "@mui/material";

export default function SignUp() {
  const { setUser } = useUser();
  const [authRes, setAuthRes] = useState();
  const navigate = useNavigate();
  let userEmail;

  async function googleAuthAndExistingUserCheck() {
    try {
      const googleRes = await signInWithGoogle();
      userEmail = googleRes.user.email;
      const existingUserCheck = await fetch(
        import.meta.env.VITE_REACT_APP_backendURL + "/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
          }),
        }
      );
      return await existingUserCheck.json();
    } catch (err) {
      if (err.name === "TypeError" || "FetchError" || "SyntaxError") {
        return `fetch error: ${err}`;
      } else {
        return `auth error: ${err}`;
      }
    }
  }

  const SignUp = async () => {
    const res = await googleAuthAndExistingUserCheck();
    setAuthRes(res);
    if (res == "proceed") {
      setUser({
        email: userEmail,
        signedUp: false,
        ceo: null,
        startup: null,
      });
    } else if (res.includes("error")) {
      window.alert(res);
    } else {
      window.alert("u r an existing user, please use signin");
    }
  };

  const SignIn = async () => {
    let res = authRes;
    if (!res) {
      res = await googleAuthAndExistingUserCheck();
    }
    if (res == "proceed") {
      window.alert("u r not an existing user, please use signup");
    } else if (res.includes("error")) {
      window.alert(res);
    } else {
      localStorage.setItem("iosUser", JSON.stringify(res));
      setUser(res);
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "background.paper",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          height: "300px",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "background.default",
          alignItems: "center",
          justifyContent: "center",
          p: "50px 0",
        }}
        gap={5}
      >
        <Box m="0 30px">
          <Stack direction="row">
            <SendIcon fontSize="large" sx={{ transform: "rotate(-90deg)" }} />
            <Typography variant="h3" component="h1">
              EdVenture Park
            </Typography>
          </Stack>
          <Typography variant="h6" component="h2" align="center">
            Signup to access Incubator OS
          </Typography>
        </Box>
        <Box
          m="0 30px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          gap={1}
        >
          <Button fullWidth variant="contained" onClick={SignUp}>
            Sign Up with Google
          </Button>
          <Button onClick={SignIn}>Already have an account? Sign in</Button>
        </Box>
      </Box>
    </Box>
  );
}
