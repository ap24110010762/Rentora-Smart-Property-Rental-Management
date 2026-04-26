import React, { useState } from 'react';
import API from '../api/axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/users/login', { email, password });
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.href = "/dashboard"; 
        } catch (err) { alert("❌ Invalid Login"); }
    };

    return (
        <div className="authv3-screen">
            <div className="authv3-card">
                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Sign In</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Access your Rentora account</p>
                <form onSubmit={handleSubmit}>
                    <div className="authv3-group">
                        <label className="authv3-label">Email Address</label>
                        <input className="authv3-input" type="email" placeholder="email@example.com" onChange={(e)=>setEmail(e.target.value)} required />
                    </div>
                    <div className="authv3-group">
                        <label className="authv3-label">Password</label>
                        <input className="authv3-input" type="password" placeholder="••••••••" onChange={(e)=>setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="authv3-btn">Log Into Account</button>
                </form>
                <p style={{ marginTop: '30px', fontSize: '14px' }}>
                    New here? <a href="/register" style={{ color: 'var(--cocoa)', fontWeight: '700', textDecoration: 'none' }}>Create Account</a>
                </p>
            </div>
        </div>
    );
}
export default Login;