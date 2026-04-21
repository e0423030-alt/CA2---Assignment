const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default AppReducer;
