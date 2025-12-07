import React, { useState, useEffect } from 'react';
import { User, CreateShiftData } from '../types';
import { employeesApi } from '../api/employees';
import { shiftsApi } from '../api/shifts';

interface ShiftFormProps {
    onSuccess: () => void;
}

const ShiftForm: React.FC<ShiftFormProps> = ({ onSuccess }) => {
    const [employees, setEmployees] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<CreateShiftData>({
        employeeId: '',
        date: '',
        startTime: '',
        endTime: '',
    });

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await employeesApi.getEmployees();
            setEmployees(data);
        } catch (err: unknown) {
            console.error('Failed to load employees:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await shiftsApi.createShift(formData);
            setFormData({
                employeeId: '',
                date: '',
                startTime: '',
                endTime: '',
            });
            onSuccess();
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosError = err as { response?: { data?: { msg?: string } } };
                setError(axiosError.response?.data?.msg || 'Failed to create shift');
            } else {
                setError('Failed to create shift');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Assign New Shift</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Employee</label>
                    <select
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select an employee</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                                {emp.name} - {emp.employeeCode} ({emp.department})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="form-group">
                        <label className="form-label">Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            className="form-input"
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
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        {error}
                    </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Assigning...' : 'Assign Shift'}
                </button>
            </form>
        </div>
    );
};

export default ShiftForm;
