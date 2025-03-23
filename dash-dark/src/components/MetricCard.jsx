import { Eye, Users, UserPlus, Star, MoreVertical } from "lucide-react"

const MetricCard = ({ icon, title, value, change, isPositive }) => {
  const renderIcon = () => {
    switch (icon) {
      case "eye":
        return <Eye size={18} />
      case "users":
        return <Users size={18} />
      case "user-plus":
        return <UserPlus size={18} />
      case "star":
        return <Star size={18} />
      default:
        return <Eye size={18} />
    }
  }

  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon">{renderIcon()}</div>
        <div className="metric-title">{title}</div>
        <button className="metric-menu">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="metric-content">
        <div className="metric-value">{value}</div>
        <div className={`metric-change ${isPositive ? "positive" : "negative"}`}>{change}</div>
      </div>
    </div>
  )
}

export default MetricCard

