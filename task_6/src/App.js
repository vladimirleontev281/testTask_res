import React from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import IndexPage from './components/index/IndexPage';
import Employees from './components/employees/EmployeesPage';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="header__wraper">
            <div className="header__logo-block">
              <h2 className="header__logo">Logo</h2>
            </div>
            <div className="header__anything">
              <h2 className="header__anything-else">anything else</h2>
            </div>
            <div className="header__links">
              <Link className="header__link" to="/">Home</Link>
              <Link className="header__link" to="/employees">Employees</Link>
            </div>
          </div>
        </header>
        <main>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/employees" component={Employees} />
        </main>
      </div>
    </Router>
  );
}

export default App;