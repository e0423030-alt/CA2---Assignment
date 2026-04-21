import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orders, loading } = useApp();

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Orders</h2>

      {orders.map((order) => (
        <div key={order.id} data-testid="order-item">
          <h3>{order.item}</h3>
          <p>Status: {order.status}</p>
          <p>Price: ₹{order.price}</p>

          <Link to={`/orders/${order.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default Orders;
