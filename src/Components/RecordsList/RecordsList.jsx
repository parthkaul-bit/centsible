import * as React from "react";
import { Typography, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import NorthEastSharpIcon from "@mui/icons-material/NorthEastSharp";
import SouthWestSharpIcon from "@mui/icons-material/SouthWestSharp";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

// dynamically render styles
export default function RecordsList(props) {
  let transElement = props.allTransactions.map((transaction) => {
    return (
      <ListItem key={nanoid()}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: transaction.isExpense
                ? "rgba(244,180,173,0.5)"
                : "rgba(111,179,113,0.5)",
            }}
          >
            {transaction.isExpense ? (
              <NorthEastSharpIcon color="error" />
            ) : (
              <SouthWestSharpIcon color="success" />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={transaction.description}
          sx={{ width: 100 }}
          secondary={
            dayjs(transaction.date).format("DD/MM/YYYY") +
            " • " +
            transaction.time
          }
        />
        <ListItemText
          sx={{
            color: transaction.isExpense
              ? "rgb(223,90,89)"
              : "rgba(111,179,113)",
          }}
          primary={"₹" + transaction.amount}
          align="end"
        />
        <Divider />
      </ListItem>
    );
  });
  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          marginBottom: "52px",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Transaction List
        </Typography>
        {transElement}
        <Divider />
      </List>
    </>
  );
}
