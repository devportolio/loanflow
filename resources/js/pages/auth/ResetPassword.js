import React from 'react'
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import useFetch from 'use-http'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
    const history = useHistory();
    const query = useQuery();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { post, response, loading, error } = useFetch('http://loanflow.local/api')

    const token = query.get('token')
    const email = query.get('email')

    const onSubmit = async data => {
        const result = await post('reset-password', {token, email, ...data})
    
        if (response.ok) {
            history.push("/")
        }
    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Forgot password</p>
            <p>
                <input placeholder="Email" readOnly defaultValue={email}/>
                {errors.email && <div>This field is required</div>}
            </p>

            <p>
                <input placeholder="Password" type="password" {...register("password", { required: true })} />
                {errors.password && <div>This field is required</div>}
            </p>

            <input type="submit" />
        </form>
    );
}

