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
            <button onClick={()=>history.push('/lending')}>Lend List</button>
            <button onClick={()=>history.push('/loans')}>Loan List</button>
        </div>
    )
}
