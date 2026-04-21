import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import OrderCard from '../components/OrderCard';
import { getValidOrders } from '../services/utils';

const Orders = () => {
  const { state, dispatch } = useContext(AppContext);
  const validOrders = getValidOrders(state.orders);

  const handleMarkDelivered = (orderId) => {
    const order = state.orders.find((o) => o.orderId === orderId);
    if (order && order.status !== 'delivered') {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId, status: 'delivered' },
      });
    }
  };

  if (state.loading) {
    return (
      <div style={styles.container}>
        <h1>Loading orders...</h1>
        <p style={{ color: '#666' }}>Authenticating and fetching data...</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div style={styles.container}>
        <h1>❌ Error</h1>
        <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>{state.error}</p>
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          Check the browser console (F12) for more details.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Orders</h1>
      <p>Total Valid Orders: {validOrders.length}</p>
      {validOrders.length === 0 ? (
        <p>No valid orders found.</p>
      ) : (
        <div style={styles.listContainer}>
          {validOrders.map((order) => (
            <div key={order.orderId} style={styles.orderWrapper}>
              <Link to={`/orders/${order.orderId}`} style={styles.link}>
                <OrderCard order={order} />
              </Link>
              <button
                onClick={() => handleMarkDelivered(order.orderId)}
                style={{
                  ...styles.button,
                  backgroundColor:
                    order.status === 'delivered' ? '#4caf50' : '#2196f3',
                }}
                disabled={order.status === 'delivered'}
              >
                {order.status === 'delivered'
                  ? 'Delivered'
                  : 'Mark as Delivered'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  listContainer: {
    marginTop: '20px',
  },
  orderWrapper: {
    marginBottom: '16px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    padding: '8px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '8px',
  },
};

export default Orders;
