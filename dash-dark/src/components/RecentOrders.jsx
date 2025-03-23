import { Calendar } from "lucide-react"

const RecentOrders = () => {
  const orders = [
    { id: "#3210", date: "Mar 21, 2023", status: "Completed", total: "$432.00" },
    { id: "#3209", date: "Mar 20, 2023", status: "Processing", total: "$125.00" },
    { id: "#3208", date: "Mar 19, 2023", status: "Completed", total: "$745.00" },
    { id: "#3207", date: "Mar 18, 2023", status: "Completed", total: "$247.00" },
  ]

  return (
    <div className="recent-orders">
      <div className="section-header">
        <h2 className="section-title">Recent orders</h2>

        <button className="btn btn-outline">
          <Calendar size={16} />
          <span>Jan 2024</span>
        </button>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                </td>
                <td>{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders

