import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Create context
export const AppContext = createContext(initialState);

// Reducer function to handle actions
function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.userInfo,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}

// Provider component
export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};