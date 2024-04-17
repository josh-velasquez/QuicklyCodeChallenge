import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/UserNavigationbar";
import { UserResponse } from "../models/User";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { getUser } from "../api";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserResponse>();
  let navigate = useNavigate();

  const handleUserLogOut = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const sessionToken = localStorage.getItem("token");
    const fetchUser = async () => {
      setLoading(true);
      if (sessionToken && sessionToken !== "") {
        try {
          const response = await getUser(sessionToken);
          setUser(response);
        } catch (error) {}
      } else {
        navigate("/*", { replace: true });
      }
      setLoading(false);
    };
    fetchUser();
  }, [navigate]);

  return (
    <>
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
        user && (
          <Container>
            <NavigationBar
              userFullName={user?.full_name}
              handleUserLogOut={handleUserLogOut}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Paper elevation={3} sx={{ p: 3, width: 400 }}>
                <Typography variant="h5" gutterBottom>
                  {user.avatar_url && (
                    <img
                      src={user.avatar_url}
                      alt="Avatar"
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 20,
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  {user.full_name}
                </Typography>
                <Divider sx={{ marginBottom: 3 }} />
                <div style={{ marginBottom: 12 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  {user.phone && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Phone:</strong> {user.phone}
                    </Typography>
                  )}
                </div>
                <Divider />
                <Typography variant="h6" gutterBottom>
                  Company
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Name:</strong> {user.Company.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Type:</strong> {user.Company.business_type}
                </Typography>
                {user?.Company.phone && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Phone:</strong> {user.Company.phone}
                  </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {user.Company.primary_email}
                </Typography>
                {user?.Company.website && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Website:</strong> {user.Company.website}
                  </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                  <strong>Early pay intent:</strong>{" "}
                  {user?.Company.early_pay_intent}
                </Typography>
                {user?.Company.address_line_1 && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Address:</strong> {user.Company.address_line_1}
                  </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                  <strong>Activity:</strong> {user.Company.expected_activity}
                </Typography>
              </Paper>
            </div>
          </Container>
        )
      )}
    </>
  );
};

export default Profile;
