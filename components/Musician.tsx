import _ from 'lodash'
import {
    SimpleGrid,
    Box,
    Image,
    Heading,
    Avatar,
    Text,
    LinkBox,
    LinkOverlay,
    Stack,
    Button,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Musician({ data }) {

    return (

        <>
            {data.map(i => console.log(i))}
        </>
    )
}
