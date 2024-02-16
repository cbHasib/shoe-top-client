import { useAppSelector } from '../../redux/hooks';
import { useCurrentToken } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { JwtPayload } from 'jwt-decode';
import { Navigate } from 'react-router-dom';


interface JwtPayloadUser extends JwtPayload {
    role: string;
}

const RedirectRoute = () => {
    const token = useAppSelector(useCurrentToken);

    let user: JwtPayloadUser | null = null;

    if (token) {
        user = verifyToken(token) as JwtPayloadUser;
    }

    if (!token || !user) {
        return <Navigate to="/login" replace={true} />;
    }

    return <Navigate to={`/${user.role}/dashboard`} replace={true} />;
};

export default RedirectRoute;