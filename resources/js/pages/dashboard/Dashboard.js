import React from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '../../store/auth/authState'

export default function Dashboard() {
    const auth = useRecoilValue(authState)

    return (
        <div>
            <h1>
                Dashboard
            </h1>
            {JSON.stringify(auth.user)}
        </div>
    )
}
