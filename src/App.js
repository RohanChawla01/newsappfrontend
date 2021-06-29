import React from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";

import { Routing } from "./hoc/Routing/routing";
import { StoreContextProvider } from "./store/storeContext";
import "./common.css";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <StoreContextProvider>
        <Route path="/*" component={Routing} />
      </StoreContextProvider>
    </BrowserRouter>
  </div>
);

export default App;
