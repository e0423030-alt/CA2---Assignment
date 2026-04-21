import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';
import Filter from '../pages/Filter';
import Stats from '../pages/Stats';

const AppRouter = () => {
  return (
    <Router>
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <h1 style={styles.logo}>Food Delivery</h1>
          <ul style={styles.navList}>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/filter">Filter</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/" element={<Orders />} />
      </Routes>
    </Router>
  );
};

const styles = {
  nav: {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '16px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    fontSize: '24px',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '24px',
    margin: 0,
    padding: 0,
  },
};

export default AppRouter;
