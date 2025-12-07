import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ShiftCard from '../components/ShiftCard';
import { PopulatedShift } from '../types';
import { shiftsApi } from '../api/shifts';
import { format, parseISO, startOfWeek, addDays, isSameDay } from 'date-fns';

const EmployeeDashboard: React.FC = () => {
    const [shifts, setShifts] = useState<PopulatedShift[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

    useEffect(() => {
        loadShifts();
    }, []);

    const loadShifts = async () => {
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

    const upcomingShifts = shifts
        .filter((shift) => {
            const shiftDate = parseISO(shift.date);
            return shiftDate >= new Date();
        })
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 5);

    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

    const getShiftsForDay = (date: Date) => {
        return shifts.filter((shift) => {
            try {
                const [year, month, day] = shift.date.split('-').map(Number);
                const shiftDate = new Date(year, month - 1, day);
                return isSameDay(shiftDate, date);
            } catch {
                return false;
            }
        });
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--gradient-dark)' }}>
            <Navbar />

            <div className="container" style={{ paddingBottom: 'var(--spacing-2xl)' }}>
                <div className="fade-in" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>My Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        View your assigned shifts and schedule
                    </p>
                </div>

                <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Upcoming Shifts</h3>

                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-xl)' }}>
                            <div className="spinner"></div>
                        </div>
                    ) : upcomingShifts.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                            No upcoming shifts scheduled
                        </p>
                    ) : (
                        <div className="grid grid-cols-3 gap-3">
                            {upcomingShifts.map((shift) => (
                                <ShiftCard key={shift._id} shift={shift} showEmployee={false} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        <h3 style={{ margin: 0 }}>Weekly Schedule</h3>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <button
                                onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
                                className="btn btn-outline"
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={() => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
                                className="btn btn-outline"
                            >
                                Today
                            </button>
                            <button
                                onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
                                className="btn btn-outline"
                            >
                                Next →
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1" style={{ gap: 'var(--spacing-md)' }}>
                        {weekDays.map((day) => {
                            const dayShifts = getShiftsForDay(day);
                            const isToday = isSameDay(day, new Date());

                            return (
                                <div
                                    key={day.toISOString()}
                                    style={{
                                        padding: 'var(--spacing-md)',
                                        background: isToday
                                            ? 'rgba(99, 102, 241, 0.1)'
                                            : 'rgba(30, 41, 59, 0.5)',
                                        border: isToday
                                            ? '2px solid var(--primary)'
                                            : '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: dayShifts.length > 0 ? 'var(--spacing-md)' : 0
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 'var(--text-lg)' }}>
                                                {format(day, 'EEEE')}
                                                {isToday && (
                                                    <span style={{
                                                        marginLeft: 'var(--spacing-sm)',
                                                        fontSize: 'var(--text-sm)',
                                                        color: 'var(--primary)',
                                                        fontWeight: 500
                                                    }}>
                                                        (Today)
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                                                {format(day, 'MMM dd, yyyy')}
                                            </div>
                                        </div>
                                        {dayShifts.length > 0 && (
                                            <div style={{
                                                background: 'var(--gradient-accent)',
                                                padding: 'var(--spacing-xs) var(--spacing-md)',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: 'var(--text-sm)',
                                                fontWeight: 600,
                                                color: 'white'
                                            }}>
                                                {dayShifts.length} {dayShifts.length === 1 ? 'shift' : 'shifts'}
                                            </div>
                                        )}
                                    </div>

                                    {dayShifts.length > 0 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                            {dayShifts.map((shift) => (
                                                <div
                                                    key={shift._id}
                                                    style={{
                                                        padding: 'var(--spacing-md)',
                                                        background: 'rgba(99, 102, 241, 0.2)',
                                                        borderRadius: 'var(--radius-md)',
                                                        border: '1px solid rgba(99, 102, 241, 0.3)'
                                                    }}
                                                >
                                                    <div style={{ fontWeight: 500 }}>
                                                        {shift.startTime} - {shift.endTime}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {shifts.length > 0 && (
                    <div className="card" style={{ marginTop: 'var(--spacing-xl)' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>All My Shifts ({shifts.length})</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {shifts.map((shift) => (
                                <ShiftCard key={shift._id} shift={shift} showEmployee={false} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;
