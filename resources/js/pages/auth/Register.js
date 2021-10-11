import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchRegister } from '../../store/authSlice';
import { authRedirect } from '../../utilities/http';


export default function Register() {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errorMessage, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSubmit = async data => {
        await dispatch(fetchRegister(data)).unwrap()
        history.push(authRedirect)
    }
  
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Register</p>
                <p>{isLoading&&'Loading....'}</p>
                {errorMessage?<p>{errorMessage}</p>:""}                
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

