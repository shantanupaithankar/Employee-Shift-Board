import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        employeeCode: '',
        department: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosError = err as { response?: { data?: { msg?: string } } };
                setError(axiosError.response?.data?.msg || 'Registration failed');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
                maxWidth: '500px',
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
                        Create Account
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Join the employee shift management system
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="form-group">
                            <label className="form-label">Employee Code</label>
                            <input
                                type="text"
                                name="employeeCode"
                                value={formData.employeeCode}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="EMP001"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="IT"
                                required
                            />
                        </div>
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
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                            Sign in here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
