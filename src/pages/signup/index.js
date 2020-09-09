import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import role from '../../services/role';
import auth from '../../services/auth';
import styles from './style';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('staff');
  const [selectRoles, setSelectRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getRoles = async () => {
    const roles = await role.getAll();
    setSelectRoles(roles.data.map((role) => role.name));
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleSelectRoles = (event) => {
    setUserType(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (username === '' || password === ''
      || email === '' || userType === ''
    ) {
      setErrorMessage('Form can\'t be blank');
    }
    const result = await auth.signup({
      username,
      email,
      password,
      roles: [userType]
    });
    if (result.success) {
      setSuccessMessage('Register Successfully');
      setErrorMessage('');
    } else {
      setErrorMessage(result);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={styles.pageContainer}>
      <div style={styles.titleContainer}>
        <b>Register Page</b>
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
            <label htmlFor="username">Email</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
            <label htmlFor="exampleFormControlSelect1">Roles</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={handleSelectRoles}>
              {
                selectRoles.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary btn-block"
              disabled={loading}
              onClick={handleSignUp}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm" />
              )}
              <span>Register</span>
            </button>
          </div>

          {successMessage && (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
              <Link
                to="/"
                className="btn btn-primary btn-block"
              >
                Redirect to Login Page
              </Link>
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
