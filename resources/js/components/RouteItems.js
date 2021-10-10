import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Home from '../pages/Home';

import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

import Dashboard from '../pages/dashboard/Dashboard';

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

                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    )
}
