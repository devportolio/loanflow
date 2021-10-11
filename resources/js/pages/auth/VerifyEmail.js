import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchVerifyEmail } from '../../store/authSlice';
import { authRedirect, useQuery } from '../../utilities/http'


export default function VerifyEmail() {
    const query = useQuery();
    const history = useHistory();
    const dispatch = useDispatch()

    const verifyEmailUrl = query.get('url').split('*').join('&')
    const splitUrl = verifyEmailUrl.split('/api/')
    const fetchUrl = splitUrl[1]

    useEffect(() => {
        fetch()
    },[]);

    const fetch = async () => {
        await dispatch(fetchVerifyEmail(fetchUrl)).unwrap()
        history.push(authRedirect)
    }

    return (
        <div>
            Email Verified
        </div>
    )
}
