import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isAdmin, loading, user } = useAuth();

    console.log('ProtectedRoute - requireAdmin:', requireAdmin, 'isAdmin:', isAdmin(), 'user:', user);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        console.log('Not authenticated, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin()) {
        console.log('Admin required but user is not admin, redirecting to dashboard');
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
