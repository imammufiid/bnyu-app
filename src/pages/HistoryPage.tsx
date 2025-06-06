import {useEffect, useRef, useState} from "react";
import {DrinkReminder} from "../models/DrinkReminder.ts";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController,
  PointElement, LineElement, Title
} from 'chart.js';
import {useUserSession} from "../hooks/useUserSession.ts";
import {useTodayReminders} from "../hooks/firebase/useTodayReminder.ts";
import {useWeekReminders} from "../hooks/firebase/useWeekReminder.ts";
import {useMonthReminders} from "../hooks/firebase/useMonthReminder.ts";

// Register components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineController,
  LineElement,
  PointElement,
  Title,
);


const TodayReminderCharts = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const {user} = useUserSession()
  const {data, fetchData} = useTodayReminders<DrinkReminder>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetchData(user.uid).then()
  }, [user]);

  useEffect(() => {
    setIsLoading(false)
    if (!data || data.length <= 0) return
    const {drinkCount, noDrinkCount} = processChartData(data);

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

  if (isLoading) return (
    <div className={'text-center w-full flex items-center justify-center'}>Loading...</div>
  )

  return <div>
    <canvas ref={chartRef}></canvas>
  </div>;
}

const WeeklyReminderCharts = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const {user} = useUserSession();
  const {data, fetchData} = useWeekReminders<DrinkReminder>();
  const [isLoading, setIsLoading] = useState(true)

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    if (!user) return;
    fetchData(user.uid).then();
  }, [user]);

  useEffect(() => {
    setIsLoading(false)
    if (!data || data.length === 0) return;

    const chartData = processChartData(data);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current!, {
      type: 'bar',
      data: {
        labels: daysOfWeek,
        datasets: [
          {
            label: 'Drink',
            data: daysOfWeek.map(day => chartData[day]?.drink || 0),
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            label: 'No Drink',
            data: daysOfWeek.map(day => chartData[day]?.noDrink || 0),
            backgroundColor: 'rgb(255, 99, 132)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
        scales: {
          x: {
            stacked: false,
            ticks: {color: 'white'},
            grid: {color: 'rgba(255, 255, 255, 0.2)'},
          },
          y: {
            beginAtZero: true,
            stacked: false,
            ticks: {color: 'white'},
            grid: {color: 'rgba(255, 255, 255, 0.2)'},
          },
        },
      },
    });
  }, [data]);

  const processChartData = (data: DrinkReminder[]) => {
    const result: Record<string, { drink: number; noDrink: number }> = {};

    data.forEach(item => {
      const date = item.createdAt.toDate();
      const day = date.toLocaleDateString('en-US', {weekday: 'long'});

      if (!result[day]) {
        result[day] = {drink: 0, noDrink: 0};
      }

      if (item.isDrink) {
        result[day].drink++;
      } else {
        result[day].noDrink++;
      }
    });

    return result;
  };

  if (isLoading) return (
    <div className={'text-center w-full flex items-center justify-center'}>Loading...</div>
  )

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

const MonthlyReminderCharts = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const {user} = useUserSession();
  const {data, fetchData} = useMonthReminders<DrinkReminder>();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return;
    fetchData(user.uid).then();
  }, [user]);

  useEffect(() => {
    setIsLoading(false)
    if (!data || data.length === 0) return;

    const {weekLabels, drinkCounts, noDrinkCounts} = processChartData(data);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current!, {
      type: 'line',
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: 'Drink',
            data: drinkCounts,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.3,
          },
          {
            label: 'No Drink',
            data: noDrinkCounts,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
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
    // Group counts by week number
    const weeklyMap = new Map<number, { drink: number; noDrink: number }>();

    data.forEach(item => {
      const date = item.createdAt.toDate();
      const week = getWeekOfMonth(date);

      if (!weeklyMap.has(week)) {
        weeklyMap.set(week, {drink: 0, noDrink: 0});
      }

      const entry = weeklyMap.get(week)!;
      if (item.isDrink) entry.drink++;
      else entry.noDrink++;
    });

    const sortedWeeks = Array.from(weeklyMap.keys()).sort((a, b) => a - b);
    const weekLabels = sortedWeeks.map(week => `W${week}`);
    const drinkCounts = sortedWeeks.map(week => weeklyMap.get(week)?.drink || 0);
    const noDrinkCounts = sortedWeeks.map(week => weeklyMap.get(week)?.noDrink || 0);

    return {weekLabels, drinkCounts, noDrinkCounts};
  };

  const getWeekOfMonth = (date: Date): number => {
    const day = date.getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayWeekday = firstDay.getDay(); // Sunday = 0
    return Math.ceil((day + firstDayWeekday) / 7);
  };

  if (isLoading) return (
    <div className={'text-center w-full flex items-center justify-center'}>Loading...</div>
  )

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export const HistoryPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-start w-full">History</h1>
      <div className=" rounded-lg shadow overflow-hidden flex-col gap-2">
        <div className={'flex gap-4'}>
          <TodayReminderCharts/>
          <WeeklyReminderCharts/>
        </div>
        <MonthlyReminderCharts/>
      </div>
    </div>
  );
}; 