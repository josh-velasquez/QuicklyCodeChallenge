import {
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { QuicklyPayload, loginUser } from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  let navigate = useNavigate();

  const logInUser = async () => {
    setLoading(true);
    const response = (await loginUser(email, password)) as QuicklyPayload;
    if (response.success && response.token) {
      localStorage.setItem("token", response.token);
      navigate(`/profile`, { replace: true });
    } else {
      setError(`Error: ${response.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    const sessionToken = localStorage.getItem("token");
    if (sessionToken && sessionToken !== "") {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 3, width: 300 }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              <AccountCircle fontSize="large" sx={{ fontSize: 70 }} />
            </Typography>
            <form>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => setEmail(event?.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => setPassword(event?.target.value)}
              />
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mt: 1, mb: 1 }}
                >
                  {error}
                </Typography>
              )}
              <Button variant="contained" fullWidth onClick={logInUser}>
                Login
              </Button>
              <Typography align="center" mt={2}>
                <Link href="#" color="primary">
                  Forgot Password?
                </Link>
              </Typography>
              <Typography align="center" mt={1}>
                Don't have an account?{" "}
                <Link component={RouterLink} to="/signup" color="primary">
                  Sign Up
                </Link>
              </Typography>
            </form>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;
