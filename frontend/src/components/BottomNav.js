import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";

function BottomNav({ onCreatePost }) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
        />

        <BottomNavigationAction
          label="Create"
          icon={
            <AddCircleIcon
              sx={{
                fontSize: 40,
                color: "#1976d2",
              }}
            />
          }
          onClick={onCreatePost}
        />

        <BottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          onClick={() =>
            navigate("/profile")
          }
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;