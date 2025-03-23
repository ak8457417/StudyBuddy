"use client"

import {useEffect, useState} from "react"
import { Calendar } from "lucide-react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const RevenueChart = () => {
  const [dateRange, setDateRange] = useState("Jan 2024 - Dec 2024")

  const [goal, setGoal] = useState([]);
  const [topics, setTopics] = useState([]);
  const [time, setTime] = useState([]);
  const [plans, setPlans] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/financial/plans");
      console.log(response.data);
      setPlans(response.data);
    } catch (e) {
      console.error("Error fetching financial plans:", e.message);
    }
  };

  const [countTopics, setCountTopics] = useState(0);
  const [doneTopics, setDoneTopics] = useState(0);

  // Function to calculate the topics and completed topics
  const calculateTopics = (plans) => {
    let totalTopics = 0;
    let totalDoneTopics = 0;

    plans.forEach((plan) => {
      // Count all the topics in the 'topics' arrays across all weeks
      plan.weeks.forEach((week) => {
        totalTopics += week.topics.length; // Add the number of topics in each week
      });

      // Count the number of completed topics from 'progress'
      totalDoneTopics += Object.keys(plan.progress).filter(topic => plan.progress[topic] === true).length;
    });

    return { totalTopics, totalDoneTopics };
  };

  useEffect(() => {
    const { totalTopics, totalDoneTopics } = calculateTopics(plans);
    setCountTopics(totalTopics);
    setDoneTopics(totalDoneTopics);
  }, [plans]);

  const addGoal = () => {
    setGoal(plans.map((plan) => {
      if (plan.subject.length > 6) {
        // Take the first letter of each word in the subject
        return plan.subject.split(' ').map(word => word.charAt(0)).join('');
      } else {
        // If the subject length is 6 or less, return it as it is
        return plan.subject;
      }
    }));
  };

  const addAmount = () => {
    const counts = plans.flatMap(plan =>
        plan.weeks.map(week => week.topics.length)
    );
    setTopics(counts);
  };

  const addInflation = () => {
    setTime(plans.map((plan) => plan.hours_per_week));
  };

  useEffect(() => {
    fetchData(); // Fetch data once when the component mounts
  }, []);

  useEffect(() => {
    // Update goal, topics, and time once plans are fetched
    addGoal();
    addAmount();
    addInflation();
  }, [plans]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          callback: (value) => {
            if (value === 0) return "0K"
            if (value === 50000) return "50K"
            if (value === 100000) return "100K"
            if (value === 150000) return "150K"
            if (value === 200000) return "200K"
            if (value === 250000) return "250K"
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "rgba(255, 255, 255, 0.9)",
        bodyColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          // Title (top line) - shows X value
          title: (context) => `Course: ${context[0].parsed.x.toLocaleString()}`,

          // Body lines - show Y values for both datasets
          // afterBody: (context) => [
          //   `Topics: ${context[0].parsed.y.toLocaleString()}`,
          //   `Hours: ${context[1].parsed.y.toLocaleString()}`
          // ]
        }
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
      },
    },
  }

  const data = {
    labels: goal,
    datasets: [
      {
        label: "Topics",
        data: topics,
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Time Per Week",
        data: time,
        borderColor: "rgba(52, 211, 153, 1)",
        backgroundColor: "rgba(52, 211, 153, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const highlightData = {
    value: "$125.2K",
    change: "+19.3%",
    date: "June 24, 2023",
  }

  return (
    <div className="revenue-chart">
      <div className="chart-header">
        <div className="chart-title-section">
          <h3 className="chart-title">Total time analysis</h3>
          <div className="chart-value">
            <span className="value">{countTopics-doneTopics} Topics</span>
            <span className="change positive">+20.1%</span>
          </div>
        </div>

        <div className="chart-actions">
          <div className="chart-legend">
            <span className="legend-item revenue">Topics</span>
            <span className="legend-item expenses">Time Per Week</span>
          </div>

          <button className="date-selector">
            <Calendar size={14} />
            <span>{dateRange}</span>
          </button>
        </div>
      </div>

      <div className="!mt-5 chart-container">
        <div className="highlight-point !hidden" style={{ top: "40%", left: "60%" }}>
          <div className="highlight-tooltip !hidden">
            <div className="highlight-value">{highlightData.value}</div>
            <div className="highlight-change positive">{highlightData.change}</div>
            <div className="highlight-date">{highlightData.date}</div>
          </div>
        </div>
        <Line options={options} data={data} height={300} />
      </div>
    </div>
  )
}

export default RevenueChart

