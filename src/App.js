import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import "antd/dist/antd.css";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/auth/login" component={Login} />
        <Route path="/" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
