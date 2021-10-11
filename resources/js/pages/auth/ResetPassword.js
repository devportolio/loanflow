import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { fetchResetPassword } from '../../store/authSlice';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
    const history = useHistory();
    const query = useQuery();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errorMessage, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    const token = query.get('token')
    const email = query.get('email')

    const onSubmit = async data => {
        await dispatch(fetchResetPassword({token, email, ...data})).unwrap()
        history.push("/login")
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Forgot password</p>
            <p>{isLoading&&'Loading....'}</p>
            {errorMessage?<p>{errorMessage}</p>:""}            
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

