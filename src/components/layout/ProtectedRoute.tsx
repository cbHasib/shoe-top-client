import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, useCurrentToken } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';
import { JwtPayload } from 'jwt-decode';

interface IProtectedRouteProps {
    children: React.ReactNode;
    role: string | undefined;
}

interface JwtPayloadUser extends JwtPayload {
    role: string;
}

const ProtectedRoute = ({ children, role }: IProtectedRouteProps) => {

    const token = useAppSelector(useCurrentToken);

    let user : JwtPayloadUser | null = null;

    if (token) {
        user = verifyToken(token) as JwtPayloadUser;
    }

    const dispatch = useAppDispatch();

    if (role !== undefined && role !== user?.role) {
        dispatch(logout());
        return <Navigate to="/login" replace={true} />;
    }
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;