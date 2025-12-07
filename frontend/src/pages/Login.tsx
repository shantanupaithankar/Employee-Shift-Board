import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login({ email, password });
            // Redirect based on role from the response (not from state which may not be updated yet)
            if (response.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosError = err as { response?: { data?: { msg?: string } } };
                setError(axiosError.response?.data?.msg || 'Login failed');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--gradient-dark)',
            padding: 'var(--spacing-lg)'
        }}>
            <div className="glass-card fade-in" style={{
                width: '100%',
                maxWidth: '450px',
                padding: 'var(--spacing-2xl)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <h1 style={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Sign in to manage employee shifts
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div style={{
                            padding: 'var(--spacing-md)',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid var(--error)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--error)',
                            marginBottom: 'var(--spacing-md)',
                            fontSize: 'var(--text-sm)'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                            Register here
                        </Link>
                    </div>
                </form>

                <div style={{
                    marginTop: 'var(--spacing-xl)',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)'
                }}>
                    <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Demo Credentials:</div>
                    <div style={{ color: 'var(--text-muted)' }}>
                        Admin: hire-me@anshumat.org / HireMe@2025!<br />
                        User: shantanu@gmail.com / shan2372005
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
