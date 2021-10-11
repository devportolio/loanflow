import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { authRedirect } from '../../utilities/http';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../store/authSlice';

export default function Login() {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errorMessage, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSubmit = async data => {
        await dispatch(fetchLogin(data)).unwrap()
        history.push(authRedirect)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Login</p>
                <p>{isLoading&&'Loading....'}</p>
                {errorMessage?<p>{errorMessage}</p>:""}
                <p>
                    <input placeholder="Email" type="email" {...register("email", { required: true })} />
                    {errors.email && <div>This field is required</div>}
                </p>
                <p>
                    <input placeholder="Password" type="password" {...register("password", { required: true })} />
                    {errors.password && <div>This field is required</div>}
                </p>
                <input type="submit" value="Login"/>
            </form>
            <p>
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
                No account yet? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

