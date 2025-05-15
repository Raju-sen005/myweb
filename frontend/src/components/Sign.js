import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sign = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://myweb-backend-x0wd.onrender.com/api/auth/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message || 'Signup successful!');
        setErrorMessage('');
        setUser({ name: '', email: '', password: '' });
        navigate('/'); // Redirect to home page
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Login failed. Server error.');
      setSuccessMessage('');
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={user.name} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" name="email" value={user.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={user.password} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Sign Up</button>
        <p className="text-center mt-3">Already have an account? <a href="/login">Login</a></p>
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

export default Sign;
