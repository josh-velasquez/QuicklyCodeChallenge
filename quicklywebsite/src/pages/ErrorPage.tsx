import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  let navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 3, width: 300 }}>
        <Typography variant="h5" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" gutterBottom>
          We're sorry, but the page you're looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/login", { replace: true })}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
};

export default ErrorPage;
