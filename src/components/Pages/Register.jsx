import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    sector: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      const length = value.length >= 8;
      const upperCase = /[A-Z]/.test(value);
      const lowerCase = /[a-z]/.test(value);
      const number = /[0-9]/.test(value);
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      setPasswordCriteria({
        length,
        upperCase,
        lowerCase,
        number,
        specialChar,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('You must accept the terms and conditions to proceed.');
      return;
    }

    if (Object.values(passwordCriteria).includes(false)) {
      alert('Password does not meet the required criteria.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Dinamik API URL - port değişikliğine uyum sağlar
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          sector: formData.sector,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Registration successful!');
        
        // Form sıfırla
        setFormData({
          fullName: '',
          companyName: '',
          sector: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
        setPasswordCriteria({
          length: false,
          upperCase: false,
          lowerCase: false,
          number: false,
          specialChar: false,
        });
        setTermsAccepted(false);
        
        // Dashboard'a yönlendir
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.error || errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="input-group">
          <label>Company Name / Individual Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter your company or individual name"
            required
          />
        </div>
        <div className="input-group">
          <label>Sector</label>
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            placeholder="Enter your sector"
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
          <small className="info-text">
            Enter your phone number without leading 0. For example: 5231234567
          </small>
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <small className="info-text">
            Your password must be at least 8 characters and include:
          </small>
          <ul className="password-criteria">
            <li className={passwordCriteria.length ? 'valid' : 'invalid'}>At least 8 characters</li>
            <li className={passwordCriteria.upperCase ? 'valid' : 'invalid'}>An uppercase letter</li>
            <li className={passwordCriteria.lowerCase ? 'valid' : 'invalid'}>A lowercase letter</li>
            <li className={passwordCriteria.number ? 'valid' : 'invalid'}>A number</li>
            <li className={passwordCriteria.specialChar ? 'valid' : 'invalid'}>A special character (e.g., ?!+/=)</li>
          </ul>
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <div className="terms">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms">
            By creating an account, you agree to the <a href="/terms">Terms and Conditions</a>.
          </label>
        </div>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Register;