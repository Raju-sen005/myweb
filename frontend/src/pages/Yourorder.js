import React, { useEffect, useState } from 'react';

const Yourorder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://myweb-backend-x0wd.onrender.com/api/order/allOrder`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // ✅ Include token here
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading your orders...</div>;

  if (!localStorage.getItem('token')) return <div className="text-center mt-5">Please login to view your orders.</div>;

  if (orders.length === 0) return <div className="text-center mt-5">You have no orders yet.</div>;

  return (
    <div className="container mt-5">
      <h3>Your Orders</h3>
      {orders.map((order, index) => (
        <div key={index} className="card my-4 shadow-sm border">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Order #{index + 1}</h5>
          </div>
          <div className="card-body">

            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>

            <h6 className="mt-3">🛒 Items:</h6>
            <ul className="list-group list-group-flush">
              {order.items.map((item, idx) => (
                <li key={idx} className="list-group-item">
                  <p className="mb-1"><strong>Product:</strong> {item.product}</p>
                  <p className="mb-1"><strong>Price:</strong> ₹{item.price}</p>
                  <p className="mb-1"><strong>Quantity:</strong> {item.quantity}</p>
                  <p className="mb-0"><strong>Total:</strong> ₹{item.price * item.quantity}</p>
                </li>
              ))}
            </ul>

            <div className="mt-3">
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              {order.user?.name && <p><strong>Customer Name:</strong> {order.user.name}</p>}
               <p><strong>Address:</strong> {order.address}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Yourorder;
