import React from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => { // Make sure this function is named correctly
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add login authentication logic here
    navigate('/editor'); // Redirect to the editor page
  };

  return (
    <div className="login-container">
      <h2>→<br />Welcome!</h2>
      <p style={{ textAlign: 'center' }}>Sign in to your account</p>
      <form onSubmit={handleSubmit}>
        <div className="input-icon">
          <input type="text" placeholder="Name" required />
          <i className="fa fa-user"></i>
        </div>
        <div className="input-icon">
          <input type="password" placeholder="Password" required />
          <i className="fa fa-eye"></i>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me?
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login →</button>
      </form>
    </div>
  );
};

export default LoginPage; // Ensure this line is present to export the component as default
