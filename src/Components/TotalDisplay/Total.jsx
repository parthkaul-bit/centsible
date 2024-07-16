import { Box, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Total(props) {
  let totalExpense = 0;
  let totalIncome = 0;
  props.allTransactions.map((transaction) => {
    if (transaction.isExpense) {
      totalExpense = totalExpense + Number(transaction.amount);
    } else {
      totalIncome = totalIncome + Number(transaction.amount);
    }
  });
  return (
    <>
      <Box align="center" marginTop={"50px"} marginBottom={"50px"}>
        <Box>
          <Typography variant="body1" align="center">
            Total balance
          </Typography>
          <Typography variant="h2" align="center">
            ₹{totalIncome - totalExpense}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          marginTop={"50px"}
        >
          <Box>
            <ArrowDownwardIcon color="success" />
            <Typography variant="body1" align="center">
              Income: ₹{totalIncome}
            </Typography>
          </Box>

          <Box>
            <ArrowUpwardIcon color="error" />
            <Typography variant="body1" align="center">
              Expense: ₹{totalExpense}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Total;
