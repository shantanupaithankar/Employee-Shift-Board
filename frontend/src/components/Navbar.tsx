import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-card" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            marginBottom: 'var(--spacing-xl)',
            borderRadius: 0
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-lg)'
            }}>
                <Link to={isAdmin() ? '/admin' : '/dashboard'} style={{ textDecoration: 'none' }}>
                    <h2 style={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        margin: 0
                    }}>
                        Employee Shift Board
                    </h2>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {user?.name}
                        </div>
                        <div style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-muted)',
                            textTransform: 'capitalize'
                        }}>
                            {user?.role}
                        </div>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
