import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/authSlice';

import Home from '../pages/Home';

import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

import ProtectedRoute from './ProtectedRoute';

import Dashboard from '../pages/dashboard/Dashboard';
import FriendList from '../pages/friend/FriendList';
import LendForm from '../pages/lend/LendForm';
import LoanList from '../pages/loan/LoanList';
import LendList from '../pages/lend/LendList';
import LoanPaymentForm from '../pages/loan/LoanPaymentForm';


export default function RouteItems() {   
    const dispatch = useDispatch()
    const { accessToken } = useSelector(state => state.auth)

    return (
        <Router>
            <div>
                { accessToken && <button onClick={()=>dispatch(logout())}>Logout</button>}
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/register" component={Register} />
                    <Route path="/reset-password" component={ResetPassword} />
                    <Route path="/verify-email" component={VerifyEmail} />

                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/friends" component={FriendList} />
                    <ProtectedRoute path="/lend" component={LendForm} />
                    <ProtectedRoute path="/loans" component={LoanList} />
                    <ProtectedRoute path="/loan-payments" component={LoanPaymentForm} />
                    <ProtectedRoute path="/lending" component={LendList} />
                </Switch>
            </div>
        </Router>
    )
}
