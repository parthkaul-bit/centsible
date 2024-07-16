import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import BasicBarChart from "./BarChart";
import BasicPie from "./PieChart";

function Analysis(props) {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} marginTop={12}>
        <Typography variant="h5" align="center" gutterBottom marginBottom={0}>
          Expense Analysis
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={6}>
        <BasicBarChart allTransactions={props.allTransactions} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" gutterBottom>
          Category Distribution
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={6} marginBottom={12}>
        <BasicPie allTransactions={props.allTransactions} />
      </Grid>
    </Grid>
  );
}

export default Analysis;
