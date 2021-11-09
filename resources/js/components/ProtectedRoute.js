import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from "react-router-dom";
import { useHistory } from 'react-router';

import { fetchUser } from "../store/authSlice";

export default function ProtectedRoute({ component: Component, ...restOfProps }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user, accessToken } = useSelector((state) => state.auth)

    useEffect(() => {
        if (accessToken && !user) {
            dispatch(fetchUser())
        }

        if (!accessToken) {
            history.push('/login')  
        }
        
    }, [accessToken])
    return (
        <Route
            {...restOfProps}
            render={(props) =>
            accessToken ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}