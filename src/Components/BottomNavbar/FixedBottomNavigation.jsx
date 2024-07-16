import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SavingsIcon from "@mui/icons-material/Savings";
import { Link, useLocation } from "react-router-dom";

export default function FixedBottomNavigation() {
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    // Determine the current value based on the pathname
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/transactions":
        setValue(1);
        break;
      case "/insights":
        setValue(2);
        break;
      case "/budget":
        setValue(3);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingBottom: 1,
        paddingTop: 1,
        borderRadius: 2,
      }}
      elevation={3}
    >
      <BottomNavigation
        position="static"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Transactions"
          icon={<ReceiptIcon />}
          component={Link}
          to="/transactions"
        />
        <BottomNavigationAction
          label="Insights"
          icon={<EqualizerIcon />}
          component={Link}
          to="/insights"
        />
        <BottomNavigationAction
          label="Budget"
          icon={<SavingsIcon />}
          component={Link}
          to="/budget"
        />
      </BottomNavigation>
    </Paper>
  );
}
