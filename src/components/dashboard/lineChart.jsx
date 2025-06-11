import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import useGlobal from '../../hooks/useGlobal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const LineChart = () => {
  const { counts } = useGlobal();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    const data = {
      labels: months,
      datasets: [
        {
          label: 'Clinician',
          lineTension: 0.4,
          fill: "origin",
          data: counts?.clinicianCounts,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Patient',
          fill: 'origin',
          data: counts?.patientCounts,
          borderColor: 'rgb(252, 70, 100)',
          lineTension: 0.4,
          backgroundColor: 'rgba(252, 70, 100, 0.5)',
        },
        {
          label: 'Appointment',
          fill: 'origin',
          lineTension: 0.4,
          data: counts?.appointmentCounts,
          borderColor: 'rgb(53, 162, 125)',
          backgroundColor: 'rgba(53, 162, 125, 0.5)',
        },
      ],
    };
    setChartData(data);
  }, [counts]);

  // const filterDataByMonth = (data, months) => {
  //   const countsByMonth = new Array(months.length).fill(0);

  //   data.forEach(item => {
  //     const itemMonth = new Date(item.date|| item.createdAt).getMonth();
  //     countsByMonth[itemMonth]++;
  //   });

  //   return countsByMonth;
  // };

  return (
    <div >
      {
        chartData &&
      <Line  data={chartData} />
      }
    </div>
  );
};

export default LineChart;
