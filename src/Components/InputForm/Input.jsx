import React from "react";
import {
  Box,
  Typography,
  Divider,
  Chip,
  Stack,
  AppBar,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
function Input(props) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      amount: props.formData.amount,
      category: props.formData.category,
      date: props.formData.date,
      time: props.formData.time,
      description: props.formData.description,
      isExpense: props.formData.isExpense,
    };

    // Depending on isExpense flag, update the corresponding field to an empty string
    if (!props.isExpense) {
      newTransaction.expense = ""; // Set expense to an empty string
    }

    // Append the new transaction to allTransactions
    props.setAllTransactions([...props.allTransactions, newTransaction]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& > :not(style)": { m: 1 } }}
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h5" gutterBottom align="center">
        Add transaction
      </Typography>
      <Divider variant="middle" />

      {props.formData.isExpense ? (
        <TextField
          required
          id="outlined-basic"
          label={"Expense name"}
          name="description"
          variant="outlined"
          onChange={handleChange}
          value={props.formData.description}
        />
      ) : (
        <TextField
          required
          id="outlined-basic"
          label={"Income name"}
          name="description"
          variant="outlined"
          onChange={handleChange}
          value={props.formData.description}
        />
      )}
      <TextField
        required
        id="outlined-basic"
        label="Amount"
        type="number"
        name="amount"
        variant="outlined"
        onChange={handleChange}
        value={props.formData.amount}
      />

      <TextField
        id="date"
        label="Date"
        type="date"
        onChange={handleChange}
        name="date"
        value={props.formData.date}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="time"
        label="Time"
        type="time"
        onChange={handleChange}
        name="time"
        value={props.formData.time}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Select Category */}
      <FormControl>
        <InputLabel id="simple-select-label" style={{ width: 200 }}>
          Category
        </InputLabel>
        <Select
          required
          labelId="simple-select-label"
          id="simple-select"
          value={props.formData.category}
          label="Category"
          name="category"
          onChange={handleChange}
          style={{ width: "25ch" }}
          placeholder="Category"
        >
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"Education"}>Education</MenuItem>
          <MenuItem value={"Allowance"}>Allowance</MenuItem>
          <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"Salary"}>Salary</MenuItem>
          <MenuItem value={"Scholarships"}>Scholarships</MenuItem>
        </Select>
      </FormControl>
      <Divider />
      <Button variant="contained" type="submit" align="center">
        Submit
      </Button>
    </Box>
  );
}

export default Input;
