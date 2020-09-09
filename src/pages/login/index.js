import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import auth from '../../services/auth';
import styles from './style';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (username === '' || password === '') {
      setErrorMessage('Form can\'t be blank');
    }
    const result = await auth.login({
      username,
      password
    });
    if (result.success) {
      localStorage.setItem('token', result.data.accessToken);
      setSuccessMessage('Login Berhasil');
      setErrorMessage('');
      window.location.reload();
    } else {
      setErrorMessage(result);
    }
    setLoading(false);
  };

  if (isLoggedIn) {
    return <Redirect to="/invoices" />;
  }

  return (
    <div className="container" style={styles.pageContainer}>
      <div style={styles.titleContainer}>
        <b>Login Page</b>
      </div>
      <div style={styles.formLogin}>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary btn-block"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm" />
              )}
              <span>Login</span>
            </button>
          </div>

          {successMessage && (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            </div>
          )}
          {
            errorMessage && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              </div>
            )
          }
        </form>
      </div>
    </div>
  );
}
