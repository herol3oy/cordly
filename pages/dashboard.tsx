import { useState } from 'react'
import AuthCheck from '../components/AuthCheck'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
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
        <Tabs
            className='d-flex justify-content-center'
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            <Tab tabClassName='salam' eventKey="link" title="Links">
                <Links />
            </Tab>
            <Tab eventKey="bio" title="Bio">
                <Bio />
            </Tab>
        </Tabs>
    )
}