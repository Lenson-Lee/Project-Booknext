import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "A"],
  datasets: [
    {
      label: "읽은 수",
      data: [12, 19, 8, 5, 3],
      backgroundColor: ["#fde047", "#fef9c3", "#fef08a", "#fcd34d", "#e5e7eb"],
      borderColor: ["#fbbf24", "#fde68a", "#fde047", "#fbbf24", "#d1d5db"],
      borderWidth: 1,
    },
  ],
};

export default function App() {
  return <Pie data={data} />;
}
