// PrivateRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../context/user';

const PrivateRoute = ({ element, ...rest }) => {
    const auth = useContext(AuthContext);
    const isLoggedIn = auth?.authContext.IsLogin || false;

    return isLoggedIn ? (
        <Route {...rest} element={element} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
