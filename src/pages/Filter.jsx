import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import OrderCard from '../components/OrderCard';
import {
  filterOrdersByRestaurant,
  getValidOrders,
} from '../services/utils';

const Filter = () => {
  const { state, dispatch } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchInput.trim()) {
      dispatch({ type: 'SET_FILTER', payload: '' });
      setSearchPerformed(true);
      return;
    }

    dispatch({ type: 'SET_FILTER', payload: searchInput });
    setSearchPerformed(true);
  };

  const handleReset = () => {
    setSearchInput('');
    dispatch({ type: 'RESET_FILTER' });
    setSearchPerformed(false);
  };

  // Get valid orders and filter by restaurant
  const validOrders = getValidOrders(state.orders);
  let filteredOrders = validOrders;

  if (searchPerformed && state.filteredRestaurant.trim()) {
    filteredOrders = filterOrdersByRestaurant(validOrders, state.filteredRestaurant);
  }

  return (
    <div style={styles.container}>
      <h1>Filter Orders by Restaurant</h1>

      <form onSubmit={handleSearch} style={styles.form}>
        <input
          data-testid="filter-input"
          type="text"
          placeholder="Enter restaurant name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{ ...styles.button, backgroundColor: '#757575' }}
        >
          Reset
        </button>
      </form>

      {searchPerformed && (
        <div style={styles.resultsSection}>
          {!searchInput.trim() ? (
            <p style={styles.error}>Please enter a restaurant name.</p>
          ) : filteredOrders.length === 0 ? (
            <p style={styles.error}>
              No results found for "{state.filteredRestaurant}"
            </p>
          ) : (
            <>
              <p style={styles.resultInfo}>
                Found {filteredOrders.length} order(s)
              </p>
              <div style={styles.listContainer}>
                {filteredOrders.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))}
              </div>
            </>
          )}
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
  form: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  resultsSection: {
    marginTop: '20px',
  },
  resultInfo: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  error: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: '12px',
  },
};

export default Filter;
