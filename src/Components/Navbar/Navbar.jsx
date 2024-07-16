import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

export default function ButtonAppBar() {
  return (
    <Box
      position="static"
      display={"flex"}
      marginTop={2}
      marginBottom={2}
      marginLeft={4}
      justifyContent={"start"}
      flexDirection={"row"}
      alignItems={"end"}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"end"}>
        <Avatar alt="logo" src="./wallet.png" />
        <Typography variant="overline" marginLeft={"4px"} color={"#616161"}>
          centsible
        </Typography>
      </Box>
    </Box>
  );
}
