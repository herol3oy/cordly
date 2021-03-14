import Nextlink from "next/link";
import NextImage from "next/image";
import _ from "lodash";
import { HiBadgeCheck } from "react-icons/hi";
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
} from "@chakra-ui/react";

export default function Musician({ data }) {
  return (
    <Flex mt={"28"}>
      {_.map(data, (i, idx) => (
        <Flex key={idx}>
          <Nextlink
            href={`/${i.username ? i.username : i.uid.slice(0, 5)}`}
            passHref
          >
            <Link>
              <Avatar
                size={"lg"}
                name="Dan Abrahmov"
                src={i.profileImg || i.photoUrl}
              />
            </Link>
          </Nextlink>
        </Flex>
      ))}
      {/* <SimpleGrid columns={[4,10]} spacingX={3} spacingY={2}>
                {
                    Array.from(Array(45).keys()).map((i, idx) => {
                        return (

                                <Nextlink
                                    href='/'
                                    passHref
                                    key={idx}
                                >
                                    <Link>
                                        <NextImage
                                            alt={'/'}
                                            src={'/avatar.jpg'}
                                            width={120}
                                            height={120}
                                            objectFit='cover'
                                        />

                                    </Link>
                                </Nextlink>
                        )
                    })
                }
            </SimpleGrid> */}
    </Flex>
  );
}
