import React, { useState, useEffect } from 'react';
import API from '../api/axios';

function Dashboard() {
    const [properties, setProperties] = useState([]);
    const [maintenance, setMaintenance] = useState([]);
    const [payments, setPayments] = useState([]);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [rent, setRent] = useState('');
    const [issue, setIssue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Selection state to track WHICH property the tenant is talking about
    const [selectedProperty, setSelectedProperty] = useState(null);
    
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
        try {
            const propRes = await API.get('/properties/all');
            const allProps = propRes.data;
            
            // Logic: Landlords see only their own, Tenants see all
            if (user.role === 'landlord') {
                setProperties(allProps.filter(p => p.landlordId?._id === user.id));
            } else {
                setProperties(allProps);
            }

            const mainRes = await API.get('/maintenance/all'); 
            setMaintenance(mainRes.data);
            const payRes = await API.get('/payments/all'); 
            setPayments(payRes.data);
        } catch (err) { console.log(err); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAddProperty = async (e) => {
        e.preventDefault();
        await API.post('/properties/add', { title, location, rentAmount: rent, landlordId: user.id });
        setTitle(''); setLocation(''); setRent(''); fetchData();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Remove listing?")) { await API.delete(`/properties/${id}`); fetchData(); }
    };

    // SMART MAINTENANCE: Links issue to specific landlord and specific house
    const handleMaintenanceSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProperty) return alert("Please click a property card below to select which owner to contact!");
        
        await API.post('/maintenance/add', { 
            tenantId: user.id, 
            propertyId: selectedProperty._id, 
            issue 
        });
        alert(`Request sent to ${selectedProperty.landlordId?.name} regarding ${selectedProperty.title}`);
        setIssue(''); fetchData();
    };

    const handlePayment = async (propId, amount) => {
        await API.post('/payments/pay', { tenantId: user.id, propertyId: propId, amount });
        alert("Payment Processed Successfully"); fetchData();
    };

    const filtered = properties.filter(p => p.location.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="dashv3-container">
            {/* 1. Header */}
            <header className="dashv3-header">
                <div>
                    <h1 style={{fontSize:'30px', fontWeight:'800'}}>Rentora Dashboard</h1>
                    <p style={{color:'var(--text-muted)', fontSize:'14px'}}>Logged in as {user?.name} ({user?.role})</p>
                </div>
                <button onClick={() => {localStorage.clear(); window.location.href="/";}} className="dashv3-signout">Sign Out</button>
            </header>

            {/* 2. Landlord Analytics & Listing Form */}
            {user?.role === 'landlord' && (
                <>
                    <div className="dashv3-stats-row">
                        <div className="dashv3-stat-card"><p className="authv3-label" style={{textAlign:'center', marginTop:0}}>Your Listings</p><h2>{properties.length}</h2></div>
                        <div className="dashv3-stat-card"><p className="authv3-label" style={{textAlign:'center', marginTop:0}}>Your Revenue</p><h2>INR {payments.filter(p => p.propertyId?.landlordId?._id === user.id).reduce((a,b)=>a+b.amount,0)}</h2></div>
                        <div className="dashv3-stat-card"><p className="authv3-label" style={{textAlign:'center', marginTop:0}}>Occupancy</p><h2>94%</h2></div>
                    </div>
                    <div className="dashv3-form-card">
                        <h3 style={{marginBottom:'20px', fontSize:'18px'}}>List New Property</h3>
                        <form onSubmit={handleAddProperty} className="dashv3-form-row">
                            <div style={{display:'flex', flexDirection:'column'}}><label className="authv3-label" style={{marginTop:0}}>Property Name</label><input className="authv3-input" style={{height:'44px'}} value={title} onChange={(e)=>setTitle(e.target.value)} required /></div>
                            <div style={{display:'flex', flexDirection:'column'}}><label className="authv3-label" style={{marginTop:0}}>Location</label><input className="authv3-input" style={{height:'44px'}} value={location} onChange={(e)=>setLocation(e.target.value)} required /></div>
                            <div style={{display:'flex', flexDirection:'column'}}><label className="authv3-label" style={{marginTop:0}}>Rent</label><input className="authv3-input" style={{height:'44px'}} type="number" value={rent} onChange={(e)=>setRent(e.target.value)} required /></div>
                            <button type="submit" className="authv3-btn" style={{height:'44px', marginTop:0}}>Create</button>
                        </form>
                    </div>
                </>
            )}

            {/* 3. Smart Logs Side-by-Side */}
            <div className="dashv3-logs-grid">
                <div className="dashv3-log-box">
                    <h3 className="authv3-label" style={{marginTop:0}}>
                        {user.role === 'tenant' ? `Contacting: ${selectedProperty?.landlordId?.name || "None Selected"}` : "Maintenance Issues"}
                    </h3>
                    {user.role === 'tenant' ? (
                        <form onSubmit={handleMaintenanceSubmit} style={{display:'flex', gap:'12px', flexDirection:'column'}}>
                            <input className="authv3-input" style={{height:'44px'}} placeholder={selectedProperty ? `Issue with ${selectedProperty.title}...` : "Click a house listing below to start"} value={issue} onChange={(e)=>setIssue(e.target.value)} required />
                            <button type="submit" className="authv3-btn" style={{height:'44px', marginTop:0}}>Report to Owner</button>
                        </form>
                    ) : (
                        // Landlord view: Shows WHICH tenant and WHICH house
                        maintenance.filter(m => m.propertyId?.landlordId === user.id).map(m => (
                            <div key={m._id} style={{fontSize:'13px', padding:'10px 0', borderBottom:'1px solid #f5f5f5'}}>
                                <b>{m.tenantId?.name}</b>: "{m.issue}" for <b>{m.propertyId?.title}</b>
                            </div>
                        ))
                    )}
                </div>
                <div className="dashv3-log-box">
                    <h3 className="authv3-label" style={{marginTop:0}}>Transaction History</h3>
                    {user.role === 'landlord' ? (
                        // Landlord sees who paid them
                        payments.filter(p => p.propertyId?.landlordId?._id === user.id).map(p => (
                            <div key={p._id} style={{fontSize:'13px', padding:'10px 0', borderBottom:'1px solid #f5f5f5'}}>
                                <b>{p.tenantId?.name}</b> paid for {p.propertyId?.title}
                            </div>
                        ))
                    ) : (
                        // Tenant sees which Landlord they paid
                        payments.filter(p => p.tenantId?._id === user.id).map(p => (
                            <div key={p._id} style={{fontSize:'13px', padding:'10px 0', borderBottom:'1px solid #f5f5f5'}}>
                                Paid INR {p.amount} to <b>{p.propertyId?.landlordId?.name}</b>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 4. Left-Aligned Search */}
            <div className="dashv3-search-wrapper">
                <label className="authv3-label">Search city</label>
                <input className="dashv3-search-input" placeholder="Find city..." onChange={(e)=>setSearchTerm(e.target.value)} />
            </div>

            <h2 style={{fontSize:'22px', fontWeight:'700', textAlign:'left', marginBottom:'25px', color:'#3E2723'}}>Available Listings</h2>

            {/* 5. Selectable Property Grid */}
            <div className="dashv3-grid">
                {filtered.map((p) => (
                    <div 
                        key={p._id} 
                        className={`dashv3-card ${selectedProperty?._id === p._id ? 'selected' : ''}`} 
                        onClick={() => setSelectedProperty(p)}
                    >
                        {user?.role === 'landlord' && <button onClick={(e) => { e.stopPropagation(); handleDelete(p._id); }} className="dashv3-delete-btn">✕</button>}
                        <h4 style={{fontSize:'20px'}}>{p.title}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize:'14px', marginTop:'6px' }}>{p.location}</p>
                        <p style={{fontSize:'12px', color:'var(--cocoa)', marginTop:'12px', background:'#f8f8f8', padding:'5px 10px', borderRadius:'6px', display:'inline-block'}}>
                            Owner: <b>{p.landlordId?.name}</b>
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f5f5', marginTop: '15px', paddingTop: '15px' }}>
                            <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--cocoa)' }}>INR {p.rentAmount}</span>
                            {user?.role === 'tenant' && <button onClick={(e) => { e.stopPropagation(); handlePayment(p._id, p.rentAmount); }} style={{ height: '32px', width: 'auto', padding: '0 15px', fontSize: '11px', background: 'var(--cocoa)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Pay Rent</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;