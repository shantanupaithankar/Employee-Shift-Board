import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ShiftForm from '../components/ShiftForm';
import ShiftCard from '../components/ShiftCard';
import { PopulatedShift, User } from '../types';
import { shiftsApi } from '../api/shifts';
import { employeesApi } from '../api/employees';

const AdminDashboard: React.FC = () => {
    const [shifts, setShifts] = useState<PopulatedShift[]>([]);
    const [employees, setEmployees] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterEmployee, setFilterEmployee] = useState('');
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [shiftsData, employeesData] = await Promise.all([
                shiftsApi.getShifts(),
                employeesApi.getEmployees(),
            ]);
            setShifts(shiftsData);
            setEmployees(employeesData);
        } catch (err) {
            console.error('Failed to load data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteShift = async (id: string) => {
        if (!confirm('Are you sure you want to delete this shift?')) return;

        try {
            await shiftsApi.deleteShift(id);
            setShifts(shifts.filter((s) => s._id !== id));
        } catch (err) {
            console.error('Failed to delete shift:', err);
            alert('Failed to delete shift');
        }
    };

    const handleFilterChange = async () => {
        setLoading(true);
        try {
            const params: { employee?: string; date?: string } = {};
            if (filterEmployee) params.employee = filterEmployee;
            if (filterDate) params.date = filterDate;

            const data = await shiftsApi.getShifts(params);
            setShifts(data);
        } catch (err) {
            console.error('Failed to filter shifts:', err);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = async () => {
        setFilterEmployee('');
        setFilterDate('');
        setLoading(true);
        try {
            const data = await shiftsApi.getShifts();
            setShifts(data);
        } catch (err) {
            console.error('Failed to load shifts:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredShifts = shifts;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--gradient-dark)' }}>
            <Navbar />

            <div className="container" style={{ paddingBottom: 'var(--spacing-2xl)' }}>
                <div className="fade-in" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>Admin Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Manage employee shifts and assignments
                    </p>
                </div>

                <div className="grid grid-cols-1" style={{ gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                    <ShiftForm onSuccess={loadData} />
                </div>

                <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Filter Shifts</h3>

                    <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Filter by Employee</label>
                            <select
                                value={filterEmployee}
                                onChange={(e) => setFilterEmployee(e.target.value)}
                                className="form-select"
                            >
                                <option value="">All Employees</option>
                                {employees.map((emp) => (
                                    <option key={emp._id} value={emp._id}>
                                        {emp.name} - {emp.employeeCode}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Filter by Date</label>
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <button onClick={handleFilterChange} className="btn btn-primary">
                            Apply Filters
                        </button>
                        <button onClick={clearFilters} className="btn btn-outline">
                            Clear Filters
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h2>All Shifts ({filteredShifts.length})</h2>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-2xl)' }}>
                        <div className="spinner"></div>
                    </div>
                ) : filteredShifts.length === 0 ? (
                    <div className="card text-center">
                        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-lg)' }}>
                            No shifts found. Assign a shift to get started!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-3">
                        {filteredShifts.map((shift) => (
                            <ShiftCard
                                key={shift._id}
                                shift={shift}
                                onDelete={handleDeleteShift}
                                showEmployee={true}
                            />
                        ))}
                    </div>
                )}

                {employees.length > 0 && (
                    <div className="card" style={{ marginTop: 'var(--spacing-xl)' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Employees ({employees.length})</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {employees.map((emp) => (
                                <div
                                    key={emp._id}
                                    style={{
                                        padding: 'var(--spacing-md)',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        border: '1px solid rgba(99, 102, 241, 0.3)',
                                        borderRadius: 'var(--radius-md)',
                                    }}
                                >
                                    <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
                                        {emp.name}
                                    </div>
                                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                                        {emp.employeeCode} • {emp.department}
                                    </div>
                                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                                        {emp.email}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
