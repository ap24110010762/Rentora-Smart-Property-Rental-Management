import React, { useState } from 'react';
import API from '../api/axios';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'tenant' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/users/register', formData);
            alert(" Account created successfully!");
            window.location.href = "/";
        } catch (err) { alert(" Error creating account"); }
    };

    return (
        <div className="authv3-screen">
            <div className="authv3-card">
                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Create Account</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '35px' }}>Join the Rentora community today</p>
                <form onSubmit={handleSubmit}>
                    <div className="authv3-group">
                        <label className="authv3-label">Full Name</label>
                        <input className="authv3-input" type="text" placeholder="e.g. Sirisha B." onChange={(e)=>setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="authv3-group">
                        <label className="authv3-label">Email Address</label>
                        <input className="authv3-input" type="email" placeholder="email@example.com" onChange={(e)=>setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="authv3-group">
                        <label className="authv3-label">Password</label>
                        <input className="authv3-input" type="password" placeholder="••••••••" onChange={(e)=>setFormData({...formData, password: e.target.value})} required />
                    </div>
                    <div className="authv3-group">
                        <label className="authv3-label">Register as:</label>
                        <select className="authv3-input" onChange={(e)=>setFormData({...formData, role: e.target.value})}>
                            <option value="tenant">Tenant</option>
                            <option value="landlord">Landlord</option>
                        </select>
                    </div>
                    <button type="submit" className="authv3-btn">Create Account</button>
                </form>
                <p style={{ marginTop: '25px', fontSize: '14px' }}>
                    Already have an account? <a href="/" style={{ color: 'var(--cocoa)', fontWeight: '700', textDecoration: 'none' }}>Sign In</a>
                </p>
            </div>
        </div>
    );
}
export default Register;