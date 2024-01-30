import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentToken } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const token = useAppSelector(useCurrentToken);

    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    // return to dashboard if hit root or login page
    if (window.location.pathname === '/' || window.location.pathname === '/login') {
        return <Navigate to="/admin/dashboard" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;