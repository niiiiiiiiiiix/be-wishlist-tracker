import React from "react";
import { Bar } from "react-chartjs-2";
import { objectIncomeMonth } from "./Dataset/dataManipulated";

const IncomeAreaChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: Object.keys(objectIncomeMonth),

          datasets: [
            {
              data: Object.values(objectIncomeMonth),
              backgroundColor: "rgba(240, 128, 128, 1)",
              borderColor: "rgba(240, 128, 128, 1)",
              hoverBackgroundColor: "rgba(240, 128, 128, 0.8)",
              hoverBorderColor: "rgba(240, 128, 128, 0.8)",
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 15,
              padding: 15,
            },
          },
          title: {
            display: true,
            text: "Income Distribution",
            fontSize: 24,
            padding: 24,
          },
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 10,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                },
                ticks: {
                  min: 0,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default IncomeAreaChart;
