import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    quantity: 1
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!item) {
      navigate('/');
    }
  }, [item, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You are not logged in! Please log in to place an order.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const quantity = Number(formData.quantity);
    const orderData = {
      customer: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone
      },
      items: [
        {
          product: item.name,
          price: item.price,
          quantity: quantity
        }
      ],
      totalAmount: item.price * quantity
    };

    try {
      const response = await fetch('https://myweb-backend-x0wd.onrender.com/api/order/create', {
        method: 'POST',
         headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // ✅ Include token here
  },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        setFormData({ name: '', address: '', phone: '', quantity: 1 });

        setTimeout(() => {
          setSuccess(false);
        }, 7000);
      } else {
        const text = await response.text();
        let message = 'Something went wrong';
        try {
          const data = JSON.parse(text);
          message = data.message || message;
        } catch (_) {}
        setError(message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const totalAmount = item ? item.price * Number(formData.quantity) : 0;

  return (
    <div className="container mt-5">
      <h3>Place Your Order</h3>

      {item && (
        <div className="mb-4">
          <h5>Item: {item.name}</h5>
          <p>Price: ₹{item.price}</p>
          <p><strong>Total Amount: ₹{totalAmount}</strong></p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" required value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" required value={formData.address} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="phone" required value={formData.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" className="form-control" id="quantity" min="1" required value={formData.quantity} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>

      {success && (
        <div className="alert alert-success mt-3" role="alert">
          ✅ Order placed successfully!
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          ❌ {error}
        </div>
      )}
    </div>
  );
};

export default Order;
