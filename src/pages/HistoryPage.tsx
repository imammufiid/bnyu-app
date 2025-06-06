import {useFirestoreGetCollection} from "../hooks/firebase/useFirestoreGetCollection.ts";
import {useEffect, useRef} from "react";
import {DrinkReminder} from "../models/DrinkReminder.ts";
import {Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import {FirestoreCollection} from "../services/FirebaseService.ts";

// Register components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const ChartsCanvas = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const {data, fetchData} = useFirestoreGetCollection<DrinkReminder>(FirestoreCollection.reminders)

  useEffect(() => {
    fetchData().then()
  }, []);

  useEffect(() => {
    if (!data || data.length <= 0) return
    const {drinkCount, noDrinkCount} = processChartData(data);
    console.log(drinkCount, noDrinkCount)

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current!, {
      type: 'bar',
      data: {
        labels: ['Drink', 'No Drink'],
        datasets: [
          {
            label: 'Count',
            data: [drinkCount, noDrinkCount],
            backgroundColor: ['rgb(54,162,235)', 'rgb(255,99,132)'],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: 'white',      // X-axis label color
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Optional: grid line color (faint white)
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',      // Y-axis label color
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      },
    });
  }, [data]);

  const processChartData = (data: DrinkReminder[]) => {
    let drinkCount = 0;
    let noDrinkCount = 0;

    data.forEach(item => {
      if (item.isDrink) drinkCount++;
      else noDrinkCount++;
    });

    return {drinkCount, noDrinkCount};
  };

  return <div>
    <canvas ref={chartRef}></canvas>
  </div>;
}

export const HistoryPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-start w-full">History</h1>
      <div className=" rounded-lg shadow overflow-hidden">
        <ChartsCanvas/>
        {/*<table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drink</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.createdAt.toDate().toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.isDrink ? "You Drank" : "FUCK"}</td>
            </tr>
          ))}
          </tbody>
        </table>*/}
      </div>
    </div>
  );
}; 