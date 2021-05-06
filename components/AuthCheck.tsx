import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Box,
  Container,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function AuthCheck(props) {
  const { user } = useContext(UserContext);
  // const isUserVerified = auth.currentUser?.emailVerified;

  return user
    // && isUserVerified
    ? props.children
    : props.fallback || <SkeletonContent user={user} />;
}

const SkeletonContent = ({ user }) => {
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, []);

  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignContent="center"
      justifyContent="center"
      height='100vh'
      width='100vw'>
      <Container mt='10'>
        <SkeletonCircle size="12" m="auto" />
        <Box padding="6" boxShadow="lg">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Box>
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4" />
      </Container>
    </Stack>
  );
};
