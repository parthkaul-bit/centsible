import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Category } from "@mui/icons-material";

// category wise expenses distribution
// value = category.amount in all
// label = category

export default function BasicPie(props) {
  const expenses = props.allTransactions.filter(
    (transaction) => transaction.isExpense
  );
  const incomes = props.allTransactions.filter(
    (transaction) => !transaction.isExpense
  );
  const expenseCategories = {};
  const incomeCategories = {};

  expenses.forEach((expense) => {
    expenseCategories[expense.category] =
      (expenseCategories[expense.category] || 0) + parseFloat(expense.amount);
  });

  incomes.forEach((income) => {
    incomeCategories[income.category] =
      (incomeCategories[income.category] || 0) + parseFloat(income.amount);
  });

  // Transform data for pie chart
  const expenseData = Object.keys(expenseCategories).map((category) => ({
    id: category,
    label: category,
    value: expenseCategories[category],
  }));

  const incomeData = Object.keys(incomeCategories).map((category) => ({
    id: category,
    label: category,
    value: incomeCategories[category],
  }));
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <PieChart
        series={[{ data: expenseData }]}
        width={400}
        height={200}
        label={"Expenses"}
      />
      <PieChart
        series={[{ data: incomeData }]}
        width={400}
        height={200}
        label={"Incomes"}
      />
    </div>
  );
}
