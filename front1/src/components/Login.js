import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log('User logged in successfully:', response.data);
            // You can store the token or redirect the user as needed
        } catch (error) {
            if (error.response) {
                console.error('Error logging in:', error.response.data);
                alert(error.response.data.msg || 'Error logging in');
            } else {
                console.error('Error logging in:', error.message);
                alert('Error logging in');
            }
        }
    };
    

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
