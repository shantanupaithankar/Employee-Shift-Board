'use client';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { UserPlus, Calendar, Clock } from 'lucide-react';

export default function ShiftForm({ onShiftAdded }) {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: '',
        date: '',
        startTime: '',
        endTime: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await api.get('/employees');
                setEmployees(res.data);
            } catch (err) {
                console.error("Failed to fetch employees");
            }
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await api.post('/shifts', formData);
            setSuccess('Shift assigned successfully!');
            setFormData({ ...formData, date: '', startTime: '', endTime: '' }); // Keep employee selected
            if (onShiftAdded) onShiftAdded();
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to assign shift');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-8 mb-8 fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
                    <UserPlus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Assign New Shift</h2>
            </div>
            
            {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-xl mb-6 text-sm border border-red-500/30 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {error}
            </div>}
            
            {success && <div className="bg-green-500/20 text-green-200 p-4 rounded-xl mb-6 text-sm border border-green-500/30 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {success}
            </div>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-1">
                    <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                        <UserPlus size={16} />
                        Employee
                    </label>
                    <select
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        className="input-field mb-0 py-3 text-gray-200"
                        required
                    >
                        <option value="" className="bg-slate-800">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp._id} value={emp._id} className="bg-slate-800">{emp.name} ({emp.department})</option>
                        ))}
                    </select>
                </div>
                
                <div className="lg:col-span-1">
                    <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                        <Calendar size={16} />
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input-field mb-0 py-3 text-gray-200"
                        required
                    />
                </div>
                
                <div className="lg:col-span-1">
                    <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                        <Clock size={16} />
                        Start Time
                    </label>
                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="input-field mb-0 py-3 text-gray-200"
                        required
                    />
                </div>
                
                <div className="lg:col-span-1">
                    <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2">
                        <Clock size={16} />
                        End Time
                    </label>
                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="input-field mb-0 py-3 text-gray-200"
                        required
                    />
                </div>
                
                <div className="lg:col-span-1 flex items-end">
                    <button
                        type="submit"
                        className="w-full btn btn-primary py-3 flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Assigning...
                            </>
                        ) : (
                            <>
                                <UserPlus size={18} />
                                Assign Shift
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
