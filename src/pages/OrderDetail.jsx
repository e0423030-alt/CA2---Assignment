import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { isValidOrder, calculateItemSubtotal } from '../services/utils';

const OrderDetail = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();

  const order = state.orders.find((o) => o.orderId === parseInt(id));

  if (!order) {
    return (
      <div style={styles.container}>
        <h1>Order not found</h1>
        <Link to="/orders">← Back to Orders</Link>
      </div>
    );
  }

  if (!isValidOrder(order)) {
    return (
      <div style={styles.container}>
        <h1>Invalid Order</h1>
        <p>This order has invalid data.</p>
        <Link to="/orders">← Back to Orders</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/orders" style={styles.backLink}>
        ← Back to Orders
      </Link>
      <h1>Order #{order.orderId}</h1>

      <div style={styles.section}>
        <h2>Order Details</h2>
        <p>
          <strong>Customer:</strong> {order.customerName || 'Unknown'}
        </p>
        <p>
          <strong>Restaurant:</strong> {order.restaurant}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        {order.deliveryTime && (
          <p>
            <strong>Delivery Time:</strong> {order.deliveryTime}
          </p>
        )}
        {order.rating && (
          <p>
            <strong>Rating:</strong> {order.rating} ⭐
          </p>
        )}
      </div>

      <div style={styles.section}>
        <h2>Items</h2>
        {order.items && order.items.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{calculateItemSubtotal(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items in this order.</p>
        )}
      </div>

      <div style={styles.totalSection}>
        <h3>Total Amount: ₹{order.totalAmount}</h3>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  backLink: {
    color: '#2196f3',
    textDecoration: 'none',
    marginBottom: '20px',
    display: 'block',
  },
  section: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '12px',
  },
  totalSection: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    textAlign: 'right',
  },
};

export default OrderDetail;
