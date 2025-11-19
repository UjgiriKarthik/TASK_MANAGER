// frontend/src/pages/Register.js
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register(){
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join us and manage your tasks easily</p>

        {err && <div className="error-box">{err}</div>}

        <form className="register-form" onSubmit={submit}>
          
          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handle}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handle}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handle}
              required
            />
          </div>

          <button className="btn register-btn" type="submit">Register</button>
        </form>

        <p className="bottom-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
