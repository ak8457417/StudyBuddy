import { Download, Plus, Calendar } from "lucide-react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const ReportsOverview = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
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
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  }

  const data = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [63, 25, 12],
        backgroundColor: ["rgba(99, 102, 241, 1)", "rgba(52, 211, 153, 1)", "rgba(251, 191, 36, 1)"],
      },
    ],
  }

  return (
    <div className="reports-overview">
      <div className="section-header">
        <h2 className="section-title">Reports overview</h2>

        <div className="header-actions">
          <button className="btn btn-outline">
            <Calendar size={16} />
            <span>Select date</span>
          </button>
          <button className="btn btn-secondary">
            <Download size={16} />
            Export data
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Create report
          </button>
        </div>
      </div>

      <div className="reports-content">
        <div className="doughnut-chart">
          <div className="chart-container">
            <Doughnut options={options} data={data} />
            <div className="chart-center-text">
              <div className="percentage">63.2%</div>
              <div className="label">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsOverview

