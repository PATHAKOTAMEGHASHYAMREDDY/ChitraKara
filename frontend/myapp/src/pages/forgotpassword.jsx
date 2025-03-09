import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('customer'); // Added userType state
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Enter email and user type, 2: Enter OTP and new passwords
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', {
        email,
        userType, // Include userType in the request
      });
      setMessage(response.data.message);
      setError('');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setMessage('');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', {
        email,
        userType, // Include userType in the request
        otp,
        newPassword,
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleSendOTP} className="form-slide-in">
          <div className="input-group">
            <label>User Type:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="input-field"
            >
              <option value="customer">Customer</option>
              <option value="artist">Artist</option>
            </select>
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword} className="form-slide-in">
          <div className="input-group">
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : 'Reset Password'}
          </button>
        </form>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Inline CSS */}
      <style jsx>{`
        .forgot-password-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h2 {
          color: #333;
          margin-bottom: 20px;
          font-family: 'Arial', sans-serif;
        }

        .form-slide-in {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .input-group {
          margin-bottom: 15px;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #555;
          font-weight: bold;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
          transition: border-color 0.3s ease;
          background: white; /* Ensure dropdown has a white background */
        }

        .input-field:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
        }

        select.input-field {
          appearance: none; /* Remove default arrow for custom styling */
          background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')
            no-repeat right 10px center;
          background-size: 12px;
          padding-right: 30px; /* Space for the custom arrow */
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover {
          background: #0056b3;
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }

        .loader {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #ffffff;
          border-top: 3px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          vertical-align: middle;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-message {
          color: #28a745;
          margin-top: 15px;
          padding: 10px;
          background: #e6ffe6;
          border-radius: 5px;
          animation: fadeIn 0.5s ease;
        }

        .error-message {
          color: #dc3545;
          margin-top: 15px;
          padding: 10px;
          background: #ffe6e6;
          border-radius: 5px;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default ForgotPassword;