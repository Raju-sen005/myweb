import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // JS

import Home from './components/Home';
import Login from './components/Login';
import Sign from './components/Sign';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Yourorder from './pages/Yourorder';
import Contact from './pages/Contact';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminLogin from './pages/AdminLogin';
// import AddItem from './pages/AddItem';
// import AllItems from './pages/AllItems';
// import Orders from './pages/Orders';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        {/* ✅ Redirect root ("/") to login */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Admin Routes */}
        {/* <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-item" element={<AddItem />} />
        <Route path="/admin/all-items" element={<AllItems />} />
        <Route path="/admin/orders" element={<Orders />} /> */}
        {/* User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/yourorder" element={<Yourorder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </>
  );
}

export default App;
