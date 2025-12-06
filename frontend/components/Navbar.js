'use client';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="glass-card mb-8 px-6 py-4 flex justify-between items-center rounded-b-2xl border-x-0 border-t-0 sticky top-0 z-50 shadow-xl">
            <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">ShiftBoard</h1>
                    <p className="text-xs text-gray-400">Employee Scheduling System</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full">
                    <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-2 rounded-lg">
                        <User size={18} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">{user?.name}</span>
                        <span className={`text-xs font-medium ${user?.role === 'admin' ? 'text-indigo-300' : 'text-emerald-300'}`}>
                            {user?.role === 'admin' ? 'Administrator' : 'Employee'}
                        </span>
                    </div>
                </div>
                <button 
                    onClick={logout} 
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 text-gray-300 hover:text-white text-sm font-medium group"
                >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
}
