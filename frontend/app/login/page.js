'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, UserPlus, LogIn } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        const res = await login(email, password);
        if (!res.success) {
            setError(res.error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="glass-card p-10 w-full max-w-md rounded-2xl fade-in">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Lock className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your ShiftBoard account</p>
                </div>
                
                {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-xl mb-6 text-sm border border-red-500/50 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {error}
                </div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                            <Mail size={16} />
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-5 h-5 text-gray-500 absolute mt-4 ml-4" />
                            <input
                                type="email"
                                className="input-field py-3 pl-12 text-gray-200"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    
                    <div className="mb-8">
                        <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                            <Lock size={16} />
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-5 h-5 text-gray-500 absolute mt-4 ml-4" />
                            <input
                                type="password"
                                className="input-field py-3 pl-12 text-gray-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className={`w-full btn btn-primary py-3 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <LogIn size={18} />
                                Sign In
                            </>
                        )}
                    </button>

                    <div className="mt-8 bg-white/5 p-4 rounded-xl border border-white/10">
                        <h3 className="text-gray-300 font-semibold mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Demo Credentials
                        </h3>
                        <div className="space-y-2 text-xs text-gray-400">
                            <p className="flex justify-between">
                                <span>Admin:</span>
                                <span className="text-gray-300">hire-me@anshumat.org / HireMe@2025!</span>
                            </p>
                            <p className="flex justify-between">
                                <span>User:</span>
                                <span className="text-gray-300">shantanu@gmail.com / shan2372005</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account? 
                            <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center justify-center gap-1 mt-2 inline-flex">
                                <UserPlus size={16} />
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}