import React from 'react'
import { useHistory } from 'react-router'

export default function Dashboard() {
    const history = useHistory()

    return (
        <div>
            <h1>
                Dashboard
            </h1>
        
            <button onClick={()=>history.push('/friends')}>Lend</button>
        </div>
    )
}
