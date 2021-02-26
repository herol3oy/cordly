import AuthCheck from '../components/AuthCheck'
import Bio from '../components/Bio'
import Links from '../components/Links'
import Username from '../components/Username'

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
        <Flex as="section" minH="90vh" direction="column" alignItems="center">
            <Tabs
                paddingTop="12"
                isFitted
                align="center"
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

                    <Tab>
                        <Box>👑</Box>
                        <Text ml={3}>Username</Text>
                    </Tab>
                </TabList>


                <TabPanels>

                    <TabPanel>
                        <Links />
                    </TabPanel>

                    <TabPanel>
                        <Bio />
                    </TabPanel>

                    <TabPanel>
                        <Username />
                    </TabPanel>

                </TabPanels>
            </Tabs>


            <Text mt="auto" textAlign="center">
                CORDLY
            </Text>
            
        </Flex>
    )
}

