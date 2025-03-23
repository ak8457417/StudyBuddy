import { Activity } from "lucide-react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js"
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

const SessionsChart = () => {
  const [quizScores, setQuizScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: "rgba(255, 255, 255, 0.5)", font: { size: 10 } }
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)", drawBorder: false },
        ticks: { color: "rgba(255, 255, 255, 0.5)", font: { size: 10 }, stepSize: 50 },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: { display: false },
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
    elements: {
      line: { tension: 0.4 },
      point: { radius: 0, hoverRadius: 5 },
    },
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/financial/quizzes");
        const scores = response.data
            .filter(quiz => typeof quiz.score !== 'undefined')
            .map(quiz => quiz.score);

        setQuizScores(scores);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const data = {
    labels: quizScores.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        data: quizScores,
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        fill: false,
      },
    ],
  };

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  return (
      <div className="sessions-chart">
        <div className="chart-header">
          <div className="chart-title-section !flex !flex-row !items-center !gap-2">
            <div className="chart-icon">
              <Activity size={16} />
            </div>
            <div>
              <h3 className="chart-title">Quiz Scores Progress</h3>
            </div>
          </div>
        </div>

        <div className="chart-container small">
          <Line options={options} data={data} height={120} />
        </div>

        <div className="chart-footer">
          <div className="visitors-count">
            <span className="count">Total Quizzes: {quizScores.length}</span>
          </div>
          <div className="chart-value-section !flex !items-center !gap-2">
            <div className="chart-value">
              Average Score: {quizScores.length > 0
                ? (quizScores.reduce((a, b) => a + b, 0) / quizScores.length).toFixed(1)
                : 0}
            </div>
          </div>
        </div>
      </div>
  );
};

export default SessionsChart;