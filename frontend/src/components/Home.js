import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token clear
    localStorage.removeItem('userId'); // Agar userId bhi store kar rakha ho
    navigate('/login'); // Redirect to login
  };

  useEffect(() => {
    fetch('https://myweb-backend-x0wd.onrender.com/Food-item')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('डेटा फ़ेच करने में त्रुटि:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Fast-Food</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/menu">Menu</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/yourorder">Your Order</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>

              {!localStorage.getItem('token') ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/sign">Signup</Link></li>
                </>
              ) : (
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger ms-2">
                    Logout
                  </button>
                </li>
              )}
            </ul>

          </div>
        </div>


      </nav>

      {/* Hero Section */}
       <section
      className="text-center text-white d-flex align-items-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        backgroundRepeat: 'no-repeat'
      }}
    >
        <div className="container">
          <h2 className="display-4">Delicious Food Delivered Fast</h2>
          <p className="lead">Order your favorite food from the best restaurants in your area.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/menu')}
          >
            Order Now
          </button>
        </div>
      </section>

      {/* Featured Items */}
     <section className="py-5">
  <div className="container ">
    {/* <h3>Featured Items</h3> */}
    {loading ? (
      <p className='text-center'>Loading items...</p>
    ) : (
      <div className="row justify-content-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="col-sm-6 col-md-4 col-lg-3 mb-4"
            onClick={() => navigate('/order', { state: item })}
            style={{ cursor: 'pointer' }}
          >
            <div className="card h-100">
              {/* 🖼️ Image Section */}
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover' }}
              />

              {/* 🧾 Text Content */}
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">
                  <strong>₹{item.price}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>



      {/* Footer */}
      {/* <footer className="bg-dark text-white py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div className="mb-3 mb-md-0">
            <Link className="text-white me-3" to="/">Privacy Policy</Link>
            <Link className="text-white me-3" to="/">Terms of Service</Link>
            <Link className="text-white me-3" to="/">FAQ</Link>
            <Link className="text-white" to="/">Contact Us</Link>
          </div>
          <div>
            <Link className="text-white me-3" to="/">Facebook</Link>
            <Link className="text-white me-3" to="/">Instagram</Link>
            <Link className="text-white" to="/">Twitter</Link>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
