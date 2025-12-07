import React from 'react';
import { format } from 'date-fns';
import { PopulatedShift } from '../types';

interface ShiftCardProps {
    shift: PopulatedShift;
    onDelete?: (id: string) => void;
    showEmployee?: boolean;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onDelete, showEmployee = true }) => {
    const formatDate = (dateStr: string) => {
        try {
            const [year, month, day] = dateStr.split('-').map(Number);
            return format(new Date(year, month - 1, day), 'MMM dd, yyyy');
        } catch {
            return dateStr;
        }
    };

    const formatTime = (time: string) => {
        try {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        } catch {
            return time;
        }
    };

    const calculateDuration = (start: string, end: string) => {
        const [startHour, startMin] = start.split(':').map(Number);
        const [endHour, endMin] = end.split(':').map(Number);
        const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="card fade-in" style={{ position: 'relative' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 'var(--spacing-md)'
            }}>
                <div>
                    <div style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--spacing-xs)'
                    }}>
                        {formatDate(shift.date)}
                    </div>
                    <div style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)'
                    }}>
                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                    </div>
                </div>
                <div style={{
                    background: 'var(--gradient-accent)',
                    padding: 'var(--spacing-xs) var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'white'
                }}>
                    {calculateDuration(shift.startTime, shift.endTime)}
                </div>
            </div>

            {showEmployee && typeof shift.employeeId === 'object' && (
                <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: 'var(--spacing-md)',
                    marginTop: 'var(--spacing-md)'
                }}>
                    <div style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--spacing-xs)'
                    }}>
                        {shift.employeeId.name}
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)'
                    }}>
                        <span>Code: {shift.employeeId.employeeCode}</span>
                        <span>•</span>
                        <span>{shift.employeeId.department}</span>
                    </div>
                </div>
            )}

            {onDelete && (
                <button
                    onClick={() => onDelete(shift._id)}
                    className="btn btn-danger"
                    style={{
                        marginTop: 'var(--spacing-md)',
                        width: '100%'
                    }}
                >
                    Delete Shift
                </button>
            )}
        </div>
    );
};

export default ShiftCard;
