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

export default function PhonePreview() {
    return (
        <Flex
            as="section"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                borderColor={'gray'}
                width={['90vw', 'sm']}
                p={5}
                borderWidth={[12, 25]}
                borderRadius={50}
                h={600}
                overflow="hidden"
                textAlign="center"
                mb={10}
            >
                <Tabs
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
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <LinksPreviewPanel />
                        </TabPanel>

                        <TabPanel>{/* <Bio /> */}</TabPanel>
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

                <Link textAlign="left" href={'/'} isExternal>
                    <Text fontSize={'xl'} fontWeight={'bold'}>
                        https://cord.ly/herol3oy
                    </Text>
                </Link>
                <ExternalLinkIcon />
            </Stack>
        </Flex>
    )
}

const LinksPreviewPanel = () => {
    return (
        <>
            <Avatar
                size="lg"
                name="profile picture"
                // src="https://bit.ly/prosper-baba"
            />

            <Text mb={5} mt={2} textAlign="center">
                @herol3oy
            </Text>
            <Stack>
                <Button w={'100%'}>Youtube</Button>
                <Button w={'100%'}>Instagram</Button>
                <Button w={'100%'}>Spotify</Button>
                <Button w={'100%'}>Soundcloud</Button>
                <Button w={'100%'}>Dizzer</Button>
            </Stack>
        </>
    )
}
