import React from "react";
import { Bar } from "react-chartjs-2";
import { objectShirtSize } from "./Dataset/dataManipulated";

const ShirtSizeBarChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: Object.keys(objectShirtSize),

          datasets: [
            {
              data: Object.values(objectShirtSize),
              backgroundColor: [
                "rgba(0, 76, 109, 1)",
                "rgba(45, 100, 132, 1)",
                "rgba(76, 124, 155, 1)",
                "rgba(105, 150, 179, 1)",
                "rgba(134, 176, 204, 1)",
                "rgba(163, 203, 229, 1)",
                "rgba(193, 231, 255, 1)",
              ],
              borderColor: [
                "rgba(0, 76, 109, 1)",
                "rgba(45, 100, 132, 1)",
                "rgba(76, 124, 155, 1)",
                "rgba(105, 150, 179, 1)",
                "rgba(134, 176, 204, 1)",
                "rgba(163, 203, 229, 1)",
                "rgba(193, 231, 255, 1)",
              ],
              borderWidth: 1,
              hoverBackgroundColor: [
                "rgba(0, 76, 109, .8)",
                "rgba(45, 100, 132, .8)",
                "rgba(76, 124, 155, .8)",
                "rgba(105, 150, 179, .8)",
                "rgba(134, 176, 204, .8)",
                "rgba(163, 203, 229, .8)",
                "rgba(193, 231, 255, .8)",
              ],
              hoverBorderColor: [
                "rgba(0, 76, 109, .8)",
                "rgba(45, 100, 132, .8)",
                "rgba(76, 124, 155, .8)",
                "rgba(105, 150, 179, .8)",
                "rgba(134, 176, 204, .8)",
                "rgba(163, 203, 229, .8)",
                "rgba(193, 231, 255, .8)",
              ],
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Shirt Size Distribution",
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
                  display: true,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  display: true,
                  min: 0,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default ShirtSizeBarChart;
