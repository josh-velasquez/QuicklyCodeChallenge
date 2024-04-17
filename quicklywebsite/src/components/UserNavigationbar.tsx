import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, LogoutRounded } from "@mui/icons-material";
interface NavigationBarProps {
  userFullName?: string;
  handleUserLogOut: () => void;
}
const NavigationBar: React.FC<NavigationBarProps> = ({
  userFullName,
  handleUserLogOut,
}) => {
  const handleUserLogOutClick = () => {
    handleUserLogOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ left: 0, right: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userFullName}
          </Typography>
          <Button onClick={handleUserLogOutClick} color="inherit">
            <LogoutRounded />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
