import AuthCheck from '../components/AuthCheck'
import Bio from '../components/Bio'
import Links from '../components/Links'
import { FaLink } from 'react-icons/fa'
import {
    Box,
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
                    <Tab>
                        <Box>🔗</Box>
                        <Text ml={3}>Links</Text>
                    </Tab>
                    <Tab>
                        <Box>✍️</Box>
                        <Text ml={3}>Bio</Text>
                    </Tab>
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