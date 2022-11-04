import React from "react";
import { AiFillHome } from "react-icons/ai";
import Header from "../header";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

import "./styles.scss";

function View() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Recolección diaria - Ultimos 7 dias",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Litros",
        },
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Recolección hoy ${moment().format("YYYY-MM-DD")}`,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Litros",
        },
      },
    },
  };

  const labels = () => {
    const today = moment();
    const res = Array(7)
      .fill()
      .map(() => today.subtract(1, "d").format("YYYY-MM-DD"));
    return res.reverse();
  };

  const data = {
    labels: labels(),
    datasets: [
      {
        label: "Todos los ganaderos",
        data: [100, 107, 287, 326, 934, 165, 613],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      /* {
        label: "Dataset 2",
        data: labels.map(() => [830, 174, 268, 861, 536, 373, 421]),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      }, */
    ],
  };

  return (
    <div className="page home" id="full">
      <div className="header-page">
        <Header title="Inicio" icon={<AiFillHome />} />
      </div>
      2
      <div className="cards">
        <div className="content-card">
          <Bar options={options2} data={data} />
        </div>
        <div className="content-card">
          <Bar options={options} data={data} />
        </div>
      </div>
      <div className="cards">
        <div className="content-card">
          <Bar options={options} data={data} />
        </div>
        <div className="content-card">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

export default View;
