import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useSelector } from 'react-redux';

import Home from '../pages/Home';

import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

import ProtectedRoute from './ProtectedRoute';

import Dashboard from '../pages/dashboard/Dashboard';
import FriendList from '../pages/friend/FriendList';


export default function RouteItems() {
    
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/register" component={Register} />
                    <Route path="/reset-password" component={ResetPassword} />
                    <Route path="/verify-email" component={VerifyEmail} />

                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/friends" component={FriendList} />
                </Switch>
            </div>
        </Router>
    )
}
