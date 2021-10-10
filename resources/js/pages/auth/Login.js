import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import useFetch from 'use-http';
import { useHistory } from 'react-router';

import { authRedirect, apiUrl } from '../../utilities/http';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../store/auth/authState';

export default function Login() {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { post, response } = useFetch(apiUrl)
    const setAuth = useSetRecoilState(authState)

    const onSubmit = async data => {
        const result = await post('login', data)
        
        if (response.ok) {
            window.localStorage.setItem('ACCESS_TOKEN', result.access_token)
            setAuth(result)

            history.push(authRedirect)
        } else {
            alert("invalid credentials")
        }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Login</p>
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

