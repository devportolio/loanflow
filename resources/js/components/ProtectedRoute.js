import React from "react";
import { useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = useSelector(state => state.auth.accessToken)

    return (
        <Route
            {...restOfProps}
            render={(props) =>
            !!isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}