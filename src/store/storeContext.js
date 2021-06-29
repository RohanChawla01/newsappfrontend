import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducers";
import { useActions } from "./actions";

export const StoreContext = createContext(initialState);

export const StoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
};
