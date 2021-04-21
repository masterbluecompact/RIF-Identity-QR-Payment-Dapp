import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import Home from "./routes/Home";
import AccountContext from "./Context";
import Create from "./routes/Create";
function App() {
  const [account, setAccount] = useState("");
  return (
    <Router>
      <AccountContext.Provider value={[account, setAccount]}>
        <NavBar></NavBar>
        <div className="page-container">
          <Switch>
            <Route path="/create">
              <Create></Create>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </div>
      </AccountContext.Provider>
    </Router>
  );
}

export default App;
