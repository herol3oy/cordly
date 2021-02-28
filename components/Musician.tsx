import Nextlink from 'next/link'
import NextImage from 'next/image'
import _ from 'lodash'
import { HiBadgeCheck } from 'react-icons/hi'
import {
    SimpleGrid,
    Box,
    Image,
    Heading,
    Avatar,
    Text,
    LinkBox,
    Link,
    LinkOverlay,
    Stack,
    Button,
    Flex,
    useColorModeValue,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    Tooltip,
} from '@chakra-ui/react'

export default function Musician({ data }) {
    return (

        <Flex mt={'28'}>
            <Wrap>
                {
                    Array.from(Array(100).keys()).map(i => {
                        return (
                            <WrapItem key={i} p={2} >
                                <Tooltip label={'lll'}>
                                    <Box
                                        as={'a'}
                                        href={'/'}
                                        rounded={20}
                                        width={'60px'}
                                        height={'60px'}
                                        overflow={'hidden'}
                                    >
                                        <NextImage
                                            alt={'as'}
                                            src={'/avatar.jpg'}
                                            width={60}
                                            height={80}
                                        />
                                    </Box>
                                </Tooltip>
                            </WrapItem>
                        )

                    })}
            </Wrap>
            {/* {_.map(data, (i, idx) => (
                <Flex key={idx}>
                    <Nextlink
                        href={`/${i.username ? i.username : i.uid}`}
                        passHref
                    >
                        <Link>

                            <Wrap>

                                <WrapItem p={2} >
                                    <Tooltip label={i.username || i.email.split('@')[0]}>
                                        <Box
                                            as={'a'}
                                            href={'/'}
                                            rounded={'full'}
                                            width={'60px'}
                                            height={'60px'}
                                            overflow={'hidden'}>
                                            <NextImage
                                                alt={i.name}
                                                src={i.photoUrl}
                                                width={60}
                                                height={60}
                                            />
                                        </Box>
                                    </Tooltip>
                                </WrapItem>
                            </Wrap>







                        </Link>
                    </Nextlink>
                </Flex>
            ))} */}
        </Flex>
    )
}
