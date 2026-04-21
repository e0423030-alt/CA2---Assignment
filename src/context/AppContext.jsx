import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from '../reducer/AppReducer';
import { getToken, getDataset } from '../services/api';

export const AppContext = createContext();


const STUDENT_ID = 'E0423038';
const PASSWORD = '649089';
const SET = 'setA';

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, {
    orders: [],
    filteredRestaurant: '',
    loading: true,
    error: null,
  });

  // Fetch data on app load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get token (with set parameter)
        const tokenResponse = await getToken(STUDENT_ID, PASSWORD, SET);

        // Step 2: Get dataset
        const data = await getDataset();
        dispatch({ type: 'SET_ORDERS', payload: data.orders || [] });
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch data';
        console.error('Error in fetchData:', errorMsg);
        dispatch({
          type: 'SET_ERROR',
          payload: errorMsg,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
