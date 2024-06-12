import { Navigate } from 'react-router-dom';

const ProtectRoutes = ({ children }: { children: any }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/auth/login" replace={true} />;
    } else {
        return children;
    }
};

export default ProtectRoutes;
