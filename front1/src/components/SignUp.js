import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [userType, setUserType] = useState('Person'); // Person or Legal Entity
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        newsSubscription: false,
        personalNumber: '',
        livingAddress: '',
        organizationName: '',
        identificationCode: '',
        actualAddress: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, confirmPassword } = formData;
        let validationErrors = {};

        if (!validatePassword(password)) {
            validationErrors.password = 'Password must be at least 8 characters long and include a number, a special character, an uppercase letter, and a lowercase letter.';
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                ...formData,
                userType
            });
            console.log('User signed up successfully:', response.data);
            setSuccess('Registration successful!');
            setFormData({
                name: '',
                surname: '',
                email: '',
                phoneNumber: '',
                newsSubscription: false,
                personalNumber: '',
                livingAddress: '',
                organizationName: '',
                identificationCode: '',
                actualAddress: '',
                password: '',
                confirmPassword: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Error signing up:', error.response.data);
            setErrors({ form: 'Registration failed. Please try again.' });
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        name="userType"
                        value="Person"
                        checked={userType === 'Person'}
                        onChange={() => setUserType('Person')}
                    /> Person
                </label>
                <label>
                    <input
                        type="radio"
                        name="userType"
                        value="Legal Entity"
                        checked={userType === 'Legal Entity'}
                        onChange={() => setUserType('Legal Entity')}
                    /> Legal Entity
                </label>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Common Fields */}
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Surname"
                    required
                />
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
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                />

                {/* Display Errors */}
                {errors.password && <div className="error">{errors.password}</div>}
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                {errors.form && <div className="error">{errors.form}</div>}

                {/* Conditional Fields for Person */}
                {userType === 'Person' && (
                    <>
                        <input
                            type="text"
                            name="personalNumber"
                            value={formData.personalNumber}
                            onChange={handleChange}
                            placeholder="Personal Number"
                        />
                        <input
                            type="text"
                            name="livingAddress"
                            value={formData.livingAddress}
                            onChange={handleChange}
                            placeholder="Living Address"
                        />
                    </>
                )}

                {/* Conditional Fields for Legal Entity */}
                {userType === 'Legal Entity' && (
                    <>
                        <input
                            type="text"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={handleChange}
                            placeholder="Organization Name"
                        />
                        <input
                            type="text"
                            name="identificationCode"
                            value={formData.identificationCode}
                            onChange={handleChange}
                            placeholder="Identification Code"
                        />
                         <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                        />
                        <input
                            type="text"
                            name="actualAddress"
                            value={formData.actualAddress}
                            onChange={handleChange}
                            placeholder="Actual Address"
                        />
                    </>
                )}

                {/* Common Fields */}
                <label>
                    <input
                        type="checkbox"
                        name="newsSubscription"
                        checked={formData.newsSubscription}
                        onChange={() => setFormData({ ...formData, newsSubscription: !formData.newsSubscription })}
                    />
                    Subscribe to News
                </label>
                <button type="submit">Sign Up</button>
            </form>

            {/* Success Message */}
            {success && <div className="success">{success}</div>}
        </div>
    );
};

export default SignUp;
