import React from "react";
import Input from "./Components/InputForm/Input.jsx";
import RecordsList from "./Components/RecordsList/RecordsList.jsx";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Typography,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import Total from "./Components/TotalDisplay/Total.jsx";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Budget from "./Components/Budget/Budget.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Analysis from "./Components/Analysis/Analysis";
import FixedBottomNavigation from "./Components/BottomNavbar/FixedBottomNavigation.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isExpense, setIsExpense] = React.useState(true);
  const [budget, setBudget] = React.useState([]);

  const generateDate = (daysOffset) =>
    dayjs().add(daysOffset, "day").format("YYYY-MM-DD");
  const generateTime = (hour, minute) =>
    dayjs().hour(hour).minute(minute).format("HH:mm");

  const [allTransactions, setAllTransactions] = React.useState(
    JSON.parse(localStorage.getItem("allTransactions")) || [
      {
        description: "Books for Exam Preparation",
        amount: "355",
        category: "Education",
        date: generateDate(-1),
        time: generateTime(10, 30),
        isExpense: true,
      },
      {
        description: "Part-Time Job Salary",
        amount: "300",
        category: "Salary",
        date: generateDate(-2),
        time: generateTime(14, 0),
        isExpense: false,
      },
      {
        description: "Movie Tickets with Friends",
        amount: "200",
        category: "Entertainment",
        date: generateDate(-3),
        time: generateTime(19, 0),
        isExpense: true,
      },
      {
        description: "Lunch at a Fast Food Restaurant",
        amount: "150",
        category: "Food",
        date: generateDate(-4),
        time: generateTime(12, 45),
        isExpense: true,
      },
      {
        description: "Scholarship Disbursement",
        amount: "200",
        category: "Scholarships",
        date: generateDate(-5),
        time: generateTime(12, 0),
        isExpense: false,
      },
      {
        description: "Bus Fare for Commuting",
        amount: "80",
        category: "Travel",
        date: generateDate(-6),
        time: generateTime(8, 15),
        isExpense: true,
      },
      {
        description: "Weekly Allowance",
        amount: "500",
        category: "Allowance",
        date: generateDate(-1),
        time: generateTime(16, 30),
        isExpense: false,
      },
    ]
  );

  const [formData, setFormData] = React.useState({
    description: "",
    amount: "",
    category: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().format("HH:mm"),
    isExpense: true,
  });

  // toggle button
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const [value, setValue] = React.useState(0);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    localStorage.setItem("allTransactions", JSON.stringify(allTransactions));
  }, [allTransactions]);

  return (
    <>
      <Navbar />
      <Divider />
      <Routes>
        <Route
          path="/"
          element={
            <Total allTransactions={allTransactions} isExpense={isExpense} />
          }
        />
        <Route
          path="insights"
          element={<Analysis allTransactions={allTransactions} />}
        />
        <Route
          path="transactions"
          element={<RecordsList allTransactions={allTransactions} />}
        />
        <Route
          path="budget"
          element={
            <Budget
              budget={budget}
              setBudget={setBudget}
              allTransactions={allTransactions}
              setAllTransactions={setAllTransactions}
            />
          }
        />
      </Routes>

      <Box>
        <Button
          onClick={handleOpen}
          sx={{
            borderRadius: 48,
            width: "auto",
            height: 64,
            bgcolor: "rgba(92,158,223, 0.5)",
          }}
          style={{
            position: "fixed",
            bottom: "15%",
            right: "15%",
            zIndex: 2,
          }}
        >
          <Typography variant="h4">+</Typography>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FormControl
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "4",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              borderRadius: 4,
              p: 4,
            }}
          >
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton
                value="left"
                aria-label="left aligned"
                variant="contained"
                type="submit"
                align="centre"
                color="error"
                onClick={() =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    isExpense: true,
                  }))
                }
              >
                EXPENSE
              </ToggleButton>

              <ToggleButton
                value="center"
                aria-label="centered"
                variant="contained"
                type="submit"
                align="centre"
                color="success"
                onClick={() =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    isExpense: false,
                  }))
                }
              >
                INCOME
              </ToggleButton>
            </ToggleButtonGroup>

            <Input
              formData={formData}
              setFormData={setFormData}
              allTransactions={allTransactions}
              setAllTransactions={setAllTransactions}
              isExpense={isExpense}
              transaction={isExpense ? "expense" : "income"}
            />
          </FormControl>
        </Modal>
      </Box>
      <Divider />
      <FixedBottomNavigation />
    </>
  );
}

export default App;
