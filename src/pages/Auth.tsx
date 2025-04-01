/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Spin, message } from 'antd';
import { css } from '@emotion/react'; // for adding styles inline using emotion

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!isLogin && password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      setLoading(true);

      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }

      message.success("Login/Signup successful!");

      setTimeout(() => {
        setLoading(false);
        navigate('/'); 
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'An error occurred');
      message.error('User credentials are incorrect');
    }
  };

  return (
    <div css={loginContainerStyle}>
      <div css={backgroundImageStyle}></div>
      <div css={formContainerStyle}>
        {loading ? (
          <div className="spin-container">
            <Spin size="large" />
          </div>
        ) : (
          <form css={formStyle} onSubmit={handleSubmit}>
            <h1 className="text-center">{isLogin ? 'Sign in to your account' : 'Create your account'}</h1>
            {error && <p css={errorTextStyle}>{error}</p>}

            <div css={formItemStyle}>
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                css={inputStyle}
              />
            </div>

            <div css={formItemStyle}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                css={inputStyle}
              />
            </div>

            <button type="submit" css={btnPrimaryStyle}>
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                css={textButtonStyle}
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const loginContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const backgroundImageStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://st2.depositphotos.com/36924814/46071/i/450/depositphotos_460713580-stock-photo-medical-health-blue-cross-neon.jpg'); /* Add your background image URL here */
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const formContainerStyle = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const formItemStyle = css`
  margin-bottom: 15px;
  width: 100%;
`;

const inputStyle = css`
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const btnPrimaryStyle = css`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;

  &:hover {
    background-color: #40a9ff;
  }
`;

const textButtonStyle = css`
  color: #1890ff;
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: #40a9ff;
  }
`;

const errorTextStyle = css`
  color: red;
  font-size: 14px;
`;

export default Auth;
