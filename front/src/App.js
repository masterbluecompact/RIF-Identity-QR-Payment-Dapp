import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import Home from "./routes/Home";
import AccountContext, { ProviderContext } from "./Context";
import Create from "./routes/Create";
import QrScanner from "./routes/QrScanner";
function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");
  return (
    <Router>
      <ProviderContext.Provider value={[provider, setProvider]}>
        <AccountContext.Provider value={[account, setAccount]}>
          <NavBar></NavBar>
          <div className="container">
            <Switch>
              <Route path="/scan">
                <QrScanner></QrScanner>
              </Route>
              <Route path="/create">
                <Create></Create>
              </Route>
              <Route path="/">
                <Home></Home>
              </Route>
            </Switch>
          </div>
        </AccountContext.Provider>
      </ProviderContext.Provider>
    </Router>
  );
}

export default App;
