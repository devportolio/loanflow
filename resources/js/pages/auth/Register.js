import React from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import useFetch from 'use-http'

import { apiUrl } from '../../utilities/http';

export default function Register() {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { post, response } = useFetch(apiUrl)

    const onSubmit = async data => {
        const result  = await post('register', data)


        if (response.ok) {
            window.localStorage.setItem('ACCESS_TOKEN', result.access_token)
            setAuth(result)
            history.push("/")
        }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Register</p>
                <p>
                    <input placeholder="Name" type="text" {...register("name", { required: true })} />
                    {errors.name && <div>This field is required</div>}
                </p>
                <p>
                    <input placeholder="Email" type="email" {...register("email", { required: true })} />
                    {errors.email && <div>This field is required</div>}
                </p>
                <p>
                    <input placeholder="Password" type="password" {...register("password", { required: true })} />
                    {errors.password && <div>This field is required</div>}
                </p>
                <input type="submit" />
            </form>
            <p>
                Already has an account? <Link to="/login">Login</Link>
            </p>            
        </div>
    );
}

