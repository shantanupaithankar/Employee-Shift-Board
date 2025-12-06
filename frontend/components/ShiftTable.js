'use client';
import { useAuth } from '../context/AuthContext';
import { Trash2, Calendar, Clock, Briefcase, User, Building, Hash } from 'lucide-react';
import api from '../utils/api';

export default function ShiftTable({ shifts, onDelete }) {
    const { user } = useAuth();

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this shift?')) {
            try {
                await api.delete(`/shifts/${id}`);
                if (onDelete) onDelete();
            } catch (err) {
                alert('Failed to delete shift');
            }
        }
    };

    if (shifts.length === 0) {
        return (
            <div className="glass-card p-16 text-center text-gray-400 rounded-2xl fade-in">
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-12 h-12 mx-auto opacity-70 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No shifts scheduled</h3>
                <p className="text-gray-500 max-w-md mx-auto">{user?.role === 'admin' 
                    ? 'Assign shifts to employees to get started.' 
                    : 'You have no upcoming shifts scheduled.'}</p>
            </div>
        );
    }

    // Sort shifts by date
    const sortedShifts = [...shifts].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
    );

    return (
        <div className="glass-card overflow-hidden rounded-2xl fade-in">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="flex items-center gap-2">
                                <User size={16} />
                                Employee
                            </th>
                            <th className="flex items-center gap-2">
                                <Calendar size={16} />
                                Date
                            </th>
                            <th className="flex items-center gap-2">
                                <Clock size={16} />
                                Time
                            </th>
                            <th className="flex items-center gap-2">
                                <Briefcase size={16} />
                                Duration
                            </th>
                            <th className="flex items-center gap-2">
                                <Building size={16} />
                                Department
                            </th>
                            <th className="flex items-center gap-2">
                                <Hash size={16} />
                                Code
                            </th>
                            {user?.role === 'admin' && <th className="text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedShifts.map(shift => {
                            // Calculate duration for display
                            const start = new Date(`2000-01-01T${shift.startTime}`);
                            const end = new Date(`2000-01-01T${shift.endTime}`);
                            const diff = (end - start) / (1000 * 60 * 60);

                            // Format date for better readability
                            const formattedDate = new Date(shift.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                            });

                            return (
                                <tr key={shift._id} className="hover:bg-white/5 transition-all duration-200">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-white">{shift.employeeId.name}</span>
                                                <span className="text-xs text-gray-400 mt-1">{shift.employeeId.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="text-gray-200 font-medium">{formattedDate}</span>
                                            <span className="text-xs text-gray-500">{shift.date}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-blue-500/10 p-1.5 rounded-lg">
                                                <Clock size={14} className="text-blue-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-200 font-medium">{shift.startTime} - {shift.endTime}</span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(`2000-01-01T${shift.startTime}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                                                    {new Date(`2000-01-01T${shift.endTime}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-info flex items-center gap-1">
                                            <Briefcase size={12} />
                                            {diff.toFixed(1)} hrs
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-emerald-500/10 p-1.5 rounded-lg">
                                                <Building size={14} className="text-emerald-400" />
                                            </div>
                                            <span className="text-gray-300">{shift.employeeId.department}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-success">
                                            {shift.employeeId.employeeCode}
                                        </span>
                                    </td>
                                    {user?.role === 'admin' && (
                                        <td className="text-right">
                                            <button
                                                onClick={() => handleDelete(shift._id)}
                                                className="p-3 hover:bg-red-500/20 rounded-xl text-red-400 transition-all duration-200 hover:scale-105"
                                                title="Delete Shift"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
