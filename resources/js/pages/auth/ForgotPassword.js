import React from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import useFetch from 'use-http'

export default function ForgotPassword() {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { post, response, loading, error } = useFetch('http://loanflow.local/api')

    const onSubmit = async data => {
        const result = await post('forgot-password', data)
        
        console.log(result)

        if (response.ok) {
            history.push("/")
        }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Forgot password</p>
                <p>
                    <input placeholder="Email" type="email" {...register("email", { required: true })} />
                    {errors.email && <div>This field is required</div>}
                </p>

                <input type="submit" />
            </form>
            <p>
                <Link to="/login">Back to login</Link>
            </p>
        </div>
    );
}

