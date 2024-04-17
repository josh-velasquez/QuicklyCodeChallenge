import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isValidEmail, isValidPassword } from "../helpers/validation";
import { createUser } from "../api";
import { CompanyPayload, UserPayload } from "../models/User";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [user, setUser] = useState<UserPayload>();
  const [company, setCompany] = useState<CompanyPayload>();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const updateUser = (updatedFields: Partial<UserPayload>): void => {
    setUser((prevUser: UserPayload | undefined) => ({
      ...prevUser!,
      ...updatedFields,
    }));
  };

  const updateCompany = (updatedFields: Partial<CompanyPayload>): void => {
    setCompany((prevCompany: CompanyPayload | undefined) => ({
      ...prevCompany!,
      ...updatedFields,
    }));
  };

  let navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let invalidInput = true;
    if (!isValidEmail(user?.email ?? "", confirmEmail)) {
      setError("Invalid email.");
      invalidInput = false;
    }
    if (!isValidPassword(user?.password ?? "", confirmPassword)) {
      setError("Invalid password.");
      invalidInput = false;
    }

    if (!invalidInput || !user || !company) {
      return;
    }

    setError("");
    setLoading(true);
    const response = await createUser(user, company);
    if (response.success && response.token) {
      localStorage.setItem("token", response.token);
      navigate(`/profile`, { replace: true });
    } else {
      setError(`Error: ${response.message}`);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 5, width: 600 }}>
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  onChange={(event) =>
                    updateUser({ first_name: event?.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  onChange={(event) =>
                    updateUser({ last_name: event?.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  onChange={(event) =>
                    updateUser({ email: event?.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Confirm Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  onChange={(event) => setConfirmEmail(event?.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  onChange={(event) =>
                    updateUser({ password: event?.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  onChange={(event) => setConfirmPassword(event?.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Company Legal Name"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  onChange={(event) =>
                    updateCompany({ legal_name: event?.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Expected Activity"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  onChange={(event) => {
                    updateCompany({ expected_activity: event?.target.value });
                    updateCompany({
                      activity: { expected_activity: event?.target.value },
                    });
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Industry"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  onChange={(event) =>
                    updateCompany({
                      industry: {
                        value: event?.target.value,
                        label: event?.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Business Type"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  onChange={(event) =>
                    updateCompany({
                      business_type: {
                        label: event?.target.value,
                        value: event?.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(event) => {
                        updateCompany({
                          early_pay_intent: event?.target.checked.toString(),
                        });
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Early Pay Intent"
                />
              </Grid>
            </Grid>

            {/* Error message and submit button */}
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
            <Button variant="contained" type="submit" fullWidth>
              Sign Up
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default SignUpPage;
