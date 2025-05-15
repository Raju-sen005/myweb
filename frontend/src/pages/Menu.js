import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://myweb-backend-x0wd.onrender.com/Food-item')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Data not found:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="py-5">
        <div className="container ">
          <h3>Menu Items</h3>
          {loading ? (
            <p>Loading items...</p>
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

    </div>
  );
};

export default Menu;
