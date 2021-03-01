import Username from '../components/Username'
import PhonePreview from '../components/PhonePreview'
import Links from '../components/Links'
import Bio from '../components/Bio'
import AuthCheck from '../components/AuthCheck'
import {
    Box,
    Flex,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    SimpleGrid,
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
        <SimpleGrid columns={[1, 1, 2, 2]} spacing={5}>
            <Flex as="section" direction="column" alignItems="center">
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
            </Flex>

            <PhonePreview />
        </SimpleGrid>
    )
}
