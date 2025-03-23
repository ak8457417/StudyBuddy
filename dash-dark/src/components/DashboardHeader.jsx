import { Download, Plus } from "lucide-react"
import {useContext} from "react";
import {FinContext} from "../context/FinContext.jsx";

const DashboardHeader = () => {

    const {token, setToken, getCurrentUser, currentUser, setCurrentUser} = useContext(FinContext)

  return (
    <div className="dashboard-header">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back, {currentUser}</h1>
        <p className="welcome-subtitle">Measure your advertising ROI and report website traffic.</p>
      </div>

      <div className="header-actions">
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
  )
}

export default DashboardHeader

