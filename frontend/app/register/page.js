'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../utils/api';
import { User, Mail, Lock, Building, Hash, UserPlus } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        employeeCode: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const res = await api.post('/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="glass-card p-10 w-full max-w-lg space-y-8 rounded-2xl fade-in">
                <div className="text-center">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <UserPlus className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Create your account
                    </h1>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Join ShiftBoard to manage your work schedule
                    </p>
                </div>
                
                {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-xl text-sm border border-red-500/50 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {error}
                </div>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-6">
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                                <User size={16} />
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="w-5 h-5 text-gray-500 absolute mt-4 ml-4" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="input-field py-3 pl-12 text-gray-200"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                                <Mail size={16} />
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-gray-500 absolute mt-4 ml-4" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="input-field py-3 pl-12 text-gray-200"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                                    <Building size={16} />
                                    Department
                                </label>
                                <div className="relative">
                                    <Building className="w-5 h-5 text-gray-500 absolute mt-4 ml-4" />
                                    <input
                                        name="department"
                                        type="text"
                                        required
                                        className="input-field py-3 pl-12 text-gray-200"
                                        placeholder="Engineering"
                                        value={formData.department}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                                    <Hash size={16} />
                                    Employee Code
                                </label>
                                <div className="relative">
                                    <Hash className="w-5 h-5 text-gray-500 absolute mt-4 ml-4" />
                                    <input
                                        name="employeeCode"
                                        type="text"
                                        required
                                        className="input-field py-3 pl-12 text-gray-200"
                                        placeholder="EMP-123"
                                        value={formData.employeeCode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                                <Lock size={16} />
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-gray-500 absolute mt-4 ml-4" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="input-field py-3 pl-12 text-gray-200"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white btn-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75' : ''}`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <UserPlus size={18} />
                                    Register Account
                                </div>
                            )}
                        </button>
                    </div>
                    
                    <div className="text-center pt-4">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1 mt-2 inline-flex">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}