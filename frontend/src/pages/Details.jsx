import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useUser } from "../context/UserContext";
import { Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


export default function SignUp() {
  const { user, setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setUser({
      ...user,
      ceo: data.get("ceo"),
      startup: data.get("startup"),
      signedUp: true,
    });

    try {
      const signUp = await fetch(
        import.meta.env.VITE_REACT_APP_backendURL + "/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            ceo: data.get("ceo"),
            startup: data.get("startup"),
          }),
        }
      );
      const res = await signUp.json();
      localStorage.setItem("iosUser", JSON.stringify(res));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "background.paper",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          width: "100dvw",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "background.default",
          alignItems: "center",
          justifyContent: "space-around",
          p: "50px 0",
        }}
        gap={5}
      >
        <Box>
          <Stack direction="row">
            <SendIcon fontSize="large" sx={{ transform: 'rotate(-90deg)' }} />
            <Typography variant="h4" component="h1">
              EdVenture Park
            </Typography>
          </Stack>
          <Typography align="center">Signup to access Incubator OS</Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="startup"
            label="Startup name"
            name="startup"
          />
          <TextField
            required
            fullWidth
            name="ceo"
            label="ceo"
            type="ceo"
            id="ceo"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
