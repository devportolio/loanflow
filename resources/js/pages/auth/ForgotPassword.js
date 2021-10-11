import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchForgotPassword } from '../../store/authSlice';

export default function ForgotPassword() {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errorMessage, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSubmit = async data => {
        await dispatch(fetchForgotPassword(data)).unwrap()
        history.push("/")
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Forgot password</p>
                <p>{isLoading&&'Loading....'}</p>
                {errorMessage?<p>{errorMessage}</p>:""}
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

