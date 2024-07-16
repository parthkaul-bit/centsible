import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Divider,
} from "@mui/material";

const initialBudget = [
  { category: "Entertainment", initialAmount: 1000, remainingAmount: 500 },
  { category: "Food", initialAmount: 2000, remainingAmount: 400 },
  { category: "Travel", initialAmount: 1000, remainingAmount: 900 },
];

function Budget({ allTransactions = allTransactions }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "None",
  });

  const [budget, setBudget] = useState(() => {
    const storedBudget = JSON.parse(localStorage.getItem("budget"));
    return storedBudget || initialBudget;
  });

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const categoryBudget = budget.find((b) => b.category === formData.category);
    if (categoryBudget) {
      setBudget((prevBudget) =>
        prevBudget.map((b) =>
          b.category === formData.category
            ? {
                ...b,
                initialAmount: parseFloat(formData.amount),
                remainingAmount: parseFloat(formData.amount),
              }
            : b
        )
      );
    } else {
      setBudget((prevBudget) => [
        ...prevBudget,
        {
          category: formData.category,
          initialAmount: parseFloat(formData.amount),
          remainingAmount: parseFloat(formData.amount),
        },
      ]);
    }
    setFormData({ amount: "", category: "None" });
  };

  const calculateRemainingBudget = (category) => {
    const filteredTransactions = allTransactions.filter(
      (transaction) =>
        transaction.isExpense && transaction.category === category
    );
    const totalSpent = filteredTransactions.reduce(
      (acc, transaction) => acc + parseFloat(transaction.amount),
      0
    );
    const categoryBudget = budget.find((b) => b.category === category);
    return categoryBudget ? categoryBudget.remainingAmount - totalSpent : 0;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        marginBottom: "52px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Set Budget
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          required
          id="outlined-basic"
          label="Amount"
          type="number"
          name="amount"
          variant="outlined"
          onChange={handleChange}
          value={formData.amount}
          sx={{ mb: 2, width: "100%" }}
        />
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <InputLabel id="simple-select-label">Category</InputLabel>
          <Select
            required
            labelId="simple-select-label"
            id="simple-select"
            value={formData.category}
            label="Category"
            name="category"
            onChange={handleChange}
          >
            <MenuItem value={"None"}>None</MenuItem>
            <MenuItem value={"Education"}>Education</MenuItem>
            <MenuItem value={"Allowance"}>Allowance</MenuItem>
            <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
            <MenuItem value={"Food"}>Food</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Set Budget
        </Button>
      </form>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 4,
        }}
      >
        {budget.map((b) => {
          const remainingAmount = calculateRemainingBudget(b.category);
          const progress = (remainingAmount / b.initialAmount) * 100;

          return (
            <Card sx={{ m: 2, width: "300px", boxShadow: 3 }} key={b.category}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{b.category}</Typography>
                <Typography variant="body1">
                  Initial Amount: ₹{b.initialAmount}
                </Typography>
                <Typography variant="body1">
                  Remaining Amount: ₹{remainingAmount}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    mt: 2,
                    height: 10,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: progress < 30 ? "#ef5350" : "#6cbd70",
                    },
                  }}
                />
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default Budget;
