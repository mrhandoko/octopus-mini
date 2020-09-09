import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  LoginPage,
  SignupPage,
  InvoicePage,
  ReportPage,
  AddInvoice,
  EditInvoice
} from './pages';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initiatingApp = () => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    initiatingApp();
  });

  const handleLogout = () => {
    window.location.reload();
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Kredivo Test
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/invoices" className="nav-link">
                Invoices
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reports" className="nav-link">
                Reports
              </Link>
            </li>
          </div>
          {
            isLoggedIn ? (
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/" onClick={handleLogout} className="nav-link">Logout</Link>
                </li>
              </ul>
            ) : (
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/register" className="nav-link">Sign Up</Link>
                </li>
                <li>
                  <Link to="/" className="nav-link">Login</Link>
                </li>
              </ul>
            )
          }
        </nav>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={SignupPage} />
          <Route exact path="/invoices" component={InvoicePage} />
          <Route exact path="/reports" component={ReportPage} />
          <Route exact path="/add-invoice" component={AddInvoice} />
          <Route exact path="/edit-invoice/:id" component={EditInvoice} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
