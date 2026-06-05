import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg,#1976d2,#42a5f5)",
      }}
    >
      <Toolbar>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Fantagram
          </Typography>

          <Typography
            variant="caption"
          >
            Welcome {user?.username}
          </Typography>
        </div>

        <IconButton
          color="inherit"
          onClick={() =>
            alert(
              "Notifications coming soon"
            )
          }
        >
          <NotificationsIcon />
        </IconButton>

        <IconButton
          color="inherit"
          onClick={handleLogout}
        >
          <LogoutIcon />
        </IconButton>

        <IconButton
          onClick={() =>
            navigate("/profile")
          }
        >
          <Avatar>
            {user?.username?.charAt(0)}
          </Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;