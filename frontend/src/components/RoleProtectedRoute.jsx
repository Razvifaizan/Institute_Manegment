import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ children, requiredRole }) => {
    const { isLoginStatus, role } = useSelector((state) => state.userCart.value);

    if (!isLoginStatus || role !== requiredRole) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default RoleProtectedRoute;
