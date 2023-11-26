import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Dashboard from "./Dashboard";
import { useUser } from "./context/userContext.jsx";
import Details from "./pages/Details";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const iosTheme = createTheme({
  palette: {
    primary: {
      main: "#1cb0f6",
    },
    background: {
      paper: "#e5e5e5",
      default: "#FFFFFF",
    },
    text:{
      primary:"#1A1A1A"
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#58cc02",
          padding:"50px 0 50px 50px"
        },
      },
    },
    MuiButton:{
      styleOverrides:{
        root:{
          borderRadius:"10px"
        }
      }
    }
  },
  typography:{
    fontFamily:"Nunito, sans-serif"
  }
});

function App() {
  const { user } = useUser();
  console.log(iosTheme);
  return (
    <ThemeProvider theme={iosTheme}>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/signup" />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/details" /> : <SignUp />}
        />
        <Route
          path="/details"
          element={
            !user ? (
              <Navigate to="/signup" />
            ) : user.signedUp||user.startup ? (
              <Navigate to="/" />
              ) : (
                <Details />
            )
          }
        />
        <Route path="*" element={user ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
