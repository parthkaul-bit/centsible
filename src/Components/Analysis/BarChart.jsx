import React from "react";
import dayjs from "dayjs";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBarChart(props) {
  const today = dayjs();
  const previousDays = [];

  // Generate data for the previous 7 days
  for (let i = 6; i >= 0; i--) {
    const date = today.subtract(i, "day").format("YYYY-MM-DD");
    previousDays.push(date);
  }

  const filteredTransactions = props.allTransactions.filter(
    (transaction) =>
      dayjs(transaction.date).isAfter(today.subtract(7, "day")) ||
      dayjs(transaction.date).isSame(today.subtract(7, "day"))
  );

  const expenseData = previousDays.map((date) => {
    const matchingTransaction = filteredTransactions.find(
      (transaction) =>
        transaction.isExpense &&
        dayjs(transaction.date).format("YYYY-MM-DD") === date
    );

    return {
      x: date,
      y: matchingTransaction ? parseFloat(matchingTransaction.amount) : 0,
    };
  });

  console.log("Expense Data:", expenseData);

  // Check if expenseData array is empty
  if (expenseData.length === 0) {
    return null; // Return null if no data is available
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <BarChart
        dataset={expenseData}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "x",
            label: "Date",
            valueFormatter: (value) => dayjs(value).format("D MMM"), // Format date labels
          },
        ]}
        series={[{ dataKey: "y", label: "Amount (₹)" }]}
        width={800}
        height={400}
        barWidth={10} // Adjust barWidth to make bars thinner (optional)
      />
    </div>
  );
}
