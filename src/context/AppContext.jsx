import { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer from "../reducer/AppReducer";
import { getToken, getDataset } from "../services/api";

const AppContext = createContext();

const initialState = {
  orders: [],
  loading: true,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenRes = await getToken();

        const data = await getDataset(
          tokenRes.token,
          tokenRes.dataUrl
        );

        console.log("DATA:", data);

        // 🔴 MOST IMPORTANT LINE
        dispatch({ type: "SET_DATA", payload: data.orders });

      } catch (err) {
        console.error("ERROR:", err);
        dispatch({ type: "SET_DATA", payload: [] });
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
