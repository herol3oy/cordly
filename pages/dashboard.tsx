import { useState } from 'react'
import AuthCheck from '../components/AuthCheck'
import Bio from '../components/Bio'
import Links from '../components/Links'
import {
    Flex,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Text,
} from '@chakra-ui/react'

export default function Dashboard(props) {
    return (
        <AuthCheck>
            <DashboardPanel />
        </AuthCheck>
    )
}

function DashboardPanel() {

    return (
        <Flex
            as='section'
            minH='100vh'
            direction='column'
            alignItems='center'
        >
            <Tabs
                paddingTop='12'
                isFitted
                align='center'
                variant="line"
                colorScheme="green"
            >
                <TabList>
                    <Tab>Links</Tab>
                    <Tab>Profile</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Links />
                    </TabPanel>
                    <TabPanel>
                        <Bio />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Text mt='auto' textAlign='center'>CORDLY</Text>
        </Flex>
    )
}