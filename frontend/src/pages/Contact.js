import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Optional here if already in index.js

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://myweb-backend-x0wd.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });

                setTimeout(() => setSuccess(false), 5000);
            } else {
                alert("Failed to send message");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h3 className="text-center mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Message</label>
                    <textarea name="message" rows="4" className="form-control" required value={formData.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>

            {success && (
                <div className="alert alert-success text-center mt-3">
                    Message sent successfully!
                </div>
            )}

            <div className="text-center mt-4">
                <h5>Follow us</h5>
                <div>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="me-3 text-primary">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="me-3 text-info">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="me-3 text-danger">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-primary">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
