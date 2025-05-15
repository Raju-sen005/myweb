import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://myweb-backend-x0wd.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (res.ok) {
  localStorage.setItem("token", data.authtoken);
 // ✅ Token ko save karo
  setSuccessMessage(data.message || 'Login successful!');
  setErrorMessage('');
  setCredentials({ email: '', password: '' });

  setTimeout(() => {
    navigate('/home');
  }, 1000);
}
else {
        setErrorMessage(data.message || 'Invalid credentials');
        setSuccessMessage('');
      }
    } catch (err) {
      setErrorMessage('Login failed. Server error.');
      setSuccessMessage('');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">Login to D-Food</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" name="email" autoComplete='username' value={credentials.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password" autoComplete='current-password' value={credentials.password} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <p className="text-center mt-3">Don't have an account? <a href="/sign">Sign up</a></p>
      </form>

      {successMessage && (
        <div className="alert alert-success mt-3 text-center">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3 text-center">{errorMessage}</div>
      )}
    </div>
  );
};

export default Login;
// 
