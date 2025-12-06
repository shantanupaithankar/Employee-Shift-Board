'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import ShiftForm from '../../components/ShiftForm';
import ShiftTable from '../../components/ShiftTable';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Clock } from 'lucide-react';

export default function Dashboard() {
    const { user, loading } = useAuth();
    const [shifts, setShifts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const fetchShifts = async () => {
        try {
            const res = await api.get('/shifts');
            setShifts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchShifts();
        }
    }, [user]);

    if (loading || !user) return null;

    // Calculate statistics
    const totalShifts = shifts.length;
    const today = new Date().toISOString().split('T')[0];
    const todayShifts = shifts.filter(shift => shift.date === today).length;
    
    // Get unique employees
    const uniqueEmployees = [...new Set(shifts.map(shift => shift.employeeId._id))].length;

    return (
        <div className="min-h-screen pb-12 bg-gradient-to-br from-slate-900 to-slate-800">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8 fade-in">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {user.role === 'admin' ? 'Admin Dashboard' : 'My Schedule'}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {user.role === 'admin'
                            ? 'Manage employee shifts and schedules.'
                            : `View your upcoming shifts, ${user.name}.`}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-card p-6 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-xl">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Shifts</p>
                            <p className="text-3xl font-bold text-white">{totalShifts}</p>
                        </div>
                    </div>
                    
                    <div className="glass-card p-6 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-xl">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">{user.role === 'admin' ? 'Employees' : 'My Shifts Today'}</p>
                            <p className="text-3xl font-bold text-white">{user.role === 'admin' ? uniqueEmployees : todayShifts}</p>
                        </div>
                    </div>
                    
                    <div className="glass-card p-6 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-xl">
                            <Clock className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Role</p>
                            <p className="text-3xl font-bold text-white capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>

                {user.role === 'admin' && (
                    <ShiftForm onShiftAdded={fetchShifts} />
                )}

                <div className="fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-indigo-400" />
                            Shift Schedule
                        </h2>
                        <div className="text-sm text-gray-500">
                            Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                    </div>
                    <ShiftTable shifts={shifts} onDelete={fetchShifts} />
                </div>
            </div>
        </div>
    );
}
