import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div data-testid="order-item" style={styles.card}>
      <div style={styles.header}>
        <h3>{order.orderId}</h3>
        <span style={styles.status}>{order.status}</span>
      </div>
      <p>
        <strong>Customer:</strong> {order.customerName || 'Unknown'}
      </p>
      <p>
        <strong>Restaurant:</strong> {order.restaurant}
      </p>
      <p>
        <strong>Amount:</strong> ₹{order.totalAmount}
      </p>
      {order.rating && (
        <p>
          <strong>Rating:</strong> {order.rating} ⭐
        </p>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  status: {
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: '#e3f2fd',
  },
};

export default OrderCard;
