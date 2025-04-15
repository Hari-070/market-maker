/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spin, message } from 'antd';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin
        ? 'http://localhost:5006/login'
        : 'http://localhost:5006/register';

      const res = await axios.post(endpoint, { email, password });

      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        message.success(res.data.message || 'Login successful!');
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 1000);
      } else {
        message.success('Signup successful! Please login now.');
        setLoading(false);
        setIsLogin(true);
      }
    } catch (err: any) {
      setLoading(false);
      const msg =
        err?.response?.data?.message || 'Something went wrong';
      console.error(msg);
      setError(msg);
      message.error(msg);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.backgroundImage}></div>
      <div style={styles.formContainer}>
        {loading ? (
          <div className="spin-container">
            <Spin size="large" />
          </div>
        ) : (
          <form style={styles.formStyle} onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'center' }}>
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h1>
            {error && <p style={styles.errorText}>{error}</p>}

            <div style={styles.formItem}>
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formItem}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.btnPrimary}>
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={styles.textButton}
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

const styles: { [key: string]: React.CSSProperties } = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage:
      "url('https://wallpapers.com/images/hd/stock-market-digitally-rendered-illustration-ru17vdywswaq7i1g.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formItem: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    padding: 10,
    width: '100%',
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  btnPrimary: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 4,
    cursor: 'pointer',
    width: '100%',
    fontSize: 16,
    transition: 'background-color 0.3s',
  },
  textButton: {
    color: '#1890ff',
    textDecoration: 'none',
    marginTop: 10,
    cursor: 'pointer',
    fontSize: 14,
    background: 'none',
    border: 'none',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
};

export default Auth;
