import { useContext } from "react";
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

export default function AuthCheck(props) {
  const { user } = useContext(UserContext);
  const isUserVerified = auth.currentUser?.emailVerified;

  return user && isUserVerified
    ? props.children
    : props.fallback || <SkeletonContent />;
}

const SkeletonContent = () => {
  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
    >
      <Container>
        <Text my={10} fontWeight="bold" fontSize="xx-large" textAlign="center">
          Please verify your account by clicking on the link that has been sent
          to your email.
        </Text>
        <SkeletonCircle size="12" m="auto" />
        <Box padding="6" boxShadow="lg">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Box>
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Container>
    </Stack>
  );
};
