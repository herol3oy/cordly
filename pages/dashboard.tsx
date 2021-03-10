import { useState } from 'react'
import Username from '../components/Username'
import PhonePreview from '../components/PhonePreview'
import Links from '../components/Links'
import Bio from '../components/Bio'
import AuthCheck from '../components/AuthCheck'
import Navigation from '../components/Navigation'
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

const defaultValues = {
    stagename: '',
    location: '',
    skills: '',
    influences: '',
    education: '',
    collaboration: false,
}

export default function Dashboard(props) {
    return (
        <AuthCheck>
            <DashboardPanel />
        </AuthCheck>
    )
}

const DashboardPanel = () => {

    const [urls, urlsSet] = useState([])
    const [formValue, formValueSet] = useState('')
    const [userNameValue, userNameValueSet] = useState('')
    const [avatarCoverImg, avatarCoverImgSet] = useState({avatar:'', cover:''})
    const [dashboardForm, dashboardFormSet] = useState(defaultValues)

    return (
        <>
            <Navigation />

            <SimpleGrid
                columns={[1, 1, 2, 2]} spacing={5}>
                <Flex as="section" direction="column" alignItems="center">
                    <Tabs
                        defaultIndex={1}
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
                                <Links urls={urls} urlsSet={urlsSet} />
                            </TabPanel>

                            <TabPanel>
                                <Bio
                                    avatarCoverImg={avatarCoverImg}
                                    avatarCoverImgSet={avatarCoverImgSet}
                                    dashboardFormSet={dashboardFormSet}
                                />
                            </TabPanel>

                            <TabPanel>
                                <Username
                                    formValue={formValue}
                                    formValueSet={formValueSet}
                                    userNameValue={userNameValue}
                                    userNameValueSet={userNameValueSet}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>

                <PhonePreview
                    urls={urls}
                    userNameValue={userNameValue}
                    avatarCoverImg={avatarCoverImg}
                // dashboardForm={dashboardForm}
                />
            </SimpleGrid>
        </>
    )
}
