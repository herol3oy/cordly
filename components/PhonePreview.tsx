import NextLink from 'next/link'
import { LinkIcon } from '@chakra-ui/icons'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
    Box,
    Flex,
    Text,
    Avatar,
    Button,
    Stack,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Link,
} from '@chakra-ui/react'

export default function PhonePreview({ urls, userNameValue, profileImg, }) {
    return (
        <Flex
            as="section"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg='darkslategray'
        >

            <Box
                borderColor={'gray.300'}
                width={['90vw', 'sm']}
                borderWidth={[12, 20]}
                borderRadius={65}
                h={724}
                overflow="hidden"
                textAlign="center"
                my={10}
                bg='dimgray'
            >
                <Avatar
                    mt={5}
                    size="lg"
                    name="profile picture"
                    src={profileImg}
                />

                <Text mb={5} mt={2} textAlign="center">
                    @{userNameValue}
                </Text>
                <Tabs
                    // isFitted
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
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <LinksPreviewPanel
                                urls={urls}
                                userNameValue={userNameValue}
                                profileImg={profileImg}
                            />
                        </TabPanel>

                        <TabPanel>
                            <BioPreviewPanel profileImg={profileImg} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

            <Stack
                rounded={'xl'}
                px={4}
                py={3}
                direction={'row'}
                alignItems={'center'}
                mb={2}
                spacing={2}
                bg="gray.700"
                color={'green.400'}
                align={'center'}
            >
                <LinkIcon />

                <Link textAlign="left" href={`/${userNameValue}`} isExternal>
                    <Text fontSize={'xl'} fontWeight={'bold'}>
                        https://cord.ly/{userNameValue}
                    </Text>
                </Link>
                <ExternalLinkIcon />
            </Stack>
        </Flex>
    )
}

const LinksPreviewPanel = ({ urls, userNameValue, profileImg }) => {
    return (
        <Stack>
            {
                urls.map((i, idx) => (
                    <Button key={idx} w={'100%'}>
                        <NextLink href={Object.values(i)[0].toString()} passHref>
                            <Link isExternal>
                                {Object.keys(i)[0].toString()}
                            </Link>
                        </NextLink>
                    </Button>
                ))
            }
        </Stack>
    )
}

const BioPreviewPanel = () => {
    return (
        <>
            {/* <Avatar
                size="lg"
                name="profile picture"
                src={profileImg}
            /> */}
        </>
    )
}