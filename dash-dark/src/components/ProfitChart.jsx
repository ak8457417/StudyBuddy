import { TrendingUp, Calendar } from "lucide-react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js"
import {useEffect, useState} from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const ProfitChart = () => {
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
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "rgba(255, 255, 255, 0.9)",
        bodyColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    barPercentage: 0.6,
    categoryPercentage: 0.8,
  }

  const [goal, setGoal] = useState([]);
  const [time, setTime] = useState([]);
  const [plans, setPlans] = useState([]);

  const totalTime = time.reduce((acc, curr) => acc + curr, 0);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/financial/plans");
      console.log(response.data);
      setPlans(response.data);
    } catch (e) {
      console.error("Error fetching financial plans:", e.message);
    }
  };

// Update goals and time correctly when plans change
  useEffect(() => {
    console.log(goal)
    setGoal(plans.map((plan) => {
      if (plan.subject.length > 6) {
        // Take the first letter of each word in the subject
        return plan.subject.split(' ').map(word => word.charAt(0)).join('');
      } else {
        // If the subject length is 6 or less, return it as it is
        return plan.subject;
      }
    }));
    setTime(plans.map((plan) => plan.hours_per_week)); // Extracts timeframes
  }, [plans]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data once when the component mounts

  const labels = ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"]

  const data = {
    labels: goal,
    datasets: [
      {
        data: time,
        backgroundColor: "rgba(99, 102, 241, 1)",
        borderRadius: 4,
      },
    ],
  }

  return (
    <div className="profit-chart">
      <div className="chart-header">
        <div className="chart-title-section !flex !flex-row !items-center !gap-2">
          <div className="chart-icon">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="chart-title">Time span</h3>
          </div>
        </div>

        <button className="date-selector small">
          <Calendar size={14} />
        </button>
      </div>

      <div className="chart-value-section !flex !items-center !gap-2">
        <div className="chart-value">{totalTime} Hours</div>
        <div className="chart-change positive !py-[2px] !text-[12px] !w-[66px] !rounded-sm !px-[8px]">+25.5%</div>
      </div>

      <div className="chart-container small">
        <Bar options={options} data={data} height={120} />
      </div>

      <div className="chart-footer">
        <span className="time-period">Last 12 months</span>
        <a href="#" className="view-link">
          View report
        </a>
      </div>
    </div>
  )
}

export default ProfitChart

