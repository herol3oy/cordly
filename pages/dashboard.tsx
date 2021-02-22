import { useState } from 'react'
import AuthCheck from '../components/AuthCheck'
import Bio from '../components/Bio'
import Links from '../components/Links'

export default function Dashboard(props) {
    return (
        <AuthCheck>
            <DashboardPanel />
        </AuthCheck>
    )
}

function DashboardPanel() {
    const [key, setKey] = useState('home')


    return (
        <>
            <Links />
            {/* <Bio /> */}
        </>
    )
}