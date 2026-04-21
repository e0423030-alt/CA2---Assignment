import { useApp } from "../context/AppContext";

const Stats = () => {
  const { orders } = useApp();

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (o) => o.status === "cancelled"
  ).length;

  // 🔴 REQUIRED
  window.appState = {
    totalOrders,
    deliveredOrders,
    cancelledOrders,
  };

  return (
    <div>
      <h2>Stats</h2>

      <p data-testid="total-orders">{totalOrders}</p>
      <p data-testid="delivered-orders">{deliveredOrders}</p>
      <p data-testid="cancelled-orders">{cancelledOrders}</p>
    </div>
  );
};

export default Stats;
