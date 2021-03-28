import { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { createUser } from "../utils/db";
import { useForm } from "react-hook-form";
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
  emailAuthProvider,
} from "../lib/firebase";
import SignInAuthCheck from "../components/SignInAuthCheck";
import {
  Box,
  Stack,
  Center,
  Heading,
  Text,
  Input,
  Button,
  Link,
  useToast,
  Divider,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export default function SignIn(props) {
  return (
    <SignInAuthCheck>
      <SignInPage />
    </SignInAuthCheck>
  );
}

const SignInPage = () => {
  const [hasAccount, hasAccountSet] = useState(false);
  const [forgotPassword, forgotPasswordSet] = useState(false);
  const [disabledBtn, disabledBtnSet] = useState(null);

  const { register, handleSubmit, watch, errors } = useForm();

  const router = useRouter();
  const toast = useToast();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then((response) => handleUser(response.user));

    router.push("/dashboard");
  };

  const signInWithFacebook = () => {
    auth
      .signInWithPopup(facebookAuthProvider)
      .then((response) => handleUser(response.user));

    router.push("/dashboard");
  };

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      return user;
    } else {
      return false;
    }
  };

  const formatUser = (user) => {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
    };
  };

  const handleForgotPassword = async (data) => {
    const { forgotEmail } = data;

    try {
      await auth.sendPasswordResetEmail(forgotEmail);

      disabledBtnSet(true);

      toast({
        title: "Email Sent",
        description: "Please check your mail box for further instructions",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async (loginData) => {
    const { email, password } = loginData;

    if (email && password) {
      try {
        await auth.signInWithEmailAndPassword(email, password);

        router.push("/");
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error.",
        description: `Please fill in the email and password inputs`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSignUp = async (signUpData) => {
    const { emailSignUp, passwordSignUp, passwordSignUpConfirm } = signUpData;

    const endpoint = `https://open.kickbox.com/v1/disposable/${emailSignUp}`;
    const { disposable } = await (await fetch(endpoint)).json();

    try {
      if (disposable) {
        toast({
          title: "Error",
          description: "This is a disposal email. Please use another email.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (passwordSignUp !== passwordSignUpConfirm) {
        toast({
          title: "Error",
          description: "Password do not match.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        const newUser = await auth.createUserWithEmailAndPassword(
          emailSignUp,
          passwordSignUp
        );

        handleUser(newUser.user);

        await auth.currentUser.sendEmailVerification();

        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack
      alignSelf="center"
      p={[4, 6, 8]}
      spacing={{ base: 8 }}
      minW={'sm'}
    >

      <Box>
        {!hasAccount ? (
          <>
            <Heading
              textAlign='center'
              color={"gray.50"}
              lineHeight={1.1}
              fontSize={['2xl', '3xl', '5xl']}
              mb={4}
            >
              Welcome.
                </Heading>

            <Center>
              <Stack spacing={2} align={"center"} maxW={"lg"} w={"full"}>
                {/* Google */}
                <Button
                  w={"full"}
                  colorScheme={"facebook"}
                  variant={"solid"}
                  leftIcon={<FcGoogle />}
                >
                  <Center>
                    <Text onClick={signInWithGoogle}>Sign in with Google</Text>
                  </Center>
                </Button>

                {/* Facebook */}
                <Button
                  w={"full"}
                  colorScheme={"facebook"}
                  leftIcon={<FaFacebook />}
                >
                  <Center>
                    <Text onClick={signInWithFacebook}>
                      Sign in with Facebook
                  </Text>
                  </Center>
                </Button>

                {/* Sign in with Email */}
                <Button
                  w={"full"}
                  colorScheme={"facebook"}
                  leftIcon={<FaEnvelope />}
                >
                  <Center>
                    <Text
                      onClick={() => {
                        hasAccountSet(true);
                        forgotPasswordSet(false);
                      }}
                    >
                      Sign in with Email
                  </Text>
                  </Center>
                </Button>
              </Stack>
            </Center>

            <Divider mt={10} />

            <Text textAlign='center' mt={-4} mb={4} >Or, sign up with your email</Text>

            <Box as={"form"} onSubmit={handleSubmit(handleSignUp)}>
              {errors.emailSignUp && `Please type your email.`}
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    ref={register({ required: true })}
                    placeholder="name@email.com"
                    name="emailSignUp"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    ref={register({ required: true })}
                    placeholder="Password"
                    type="password"
                    name="passwordSignUp"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    ref={register({ required: true })}
                    type="password"
                    name="passwordSignUpConfirm"
                    placeholder="Confirm password"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>
              </Stack>
              <Button
                type={"submit"}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                SIGN UP
                  </Button>
            </Box>
          </>
        ) : (
          <>
            {forgotPassword ? (
              <>
                <Heading
                  textAlign='center'
                  color={"gray.50"}
                  lineHeight={1.1}
                  fontSize={['2xl', '3xl', '5xl']}
                  mb={4}
                >
                  Forgot password
                </Heading>
                {errors.forgotEmail && `Please type your email.`}
                <Box
                  as={"form"}
                  mt={10}
                  onSubmit={handleSubmit(handleForgotPassword)}
                >
                  <Stack spacing={4}>
                    <Input
                      disabled={disabledBtn && true}
                      ref={register({
                        required: true,
                      })}
                      placeholder="Email"
                      name="forgotEmail"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                  </Stack>
                  <Button
                    disabled={disabledBtn && true}
                    type={"submit"}
                    fontFamily={"heading"}
                    mt={8}
                    w={"full"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    color={"white"}
                    _hover={{
                      bgGradient: "linear(to-r, red.400,pink.400)",
                      boxShadow: "xl",
                    }}
                  >
                    Send password
                      </Button>
                </Box>
              </>
            ) : (
              <>
                <Heading
                  textAlign='center'
                  color={"gray.50"}
                  lineHeight={1.1}
                  fontSize={['2xl', '3xl', '5xl']}
                  mb={4}
                >
                  Sign in
                </Heading>
                <Box
                  as={"form"}
                  mt={10}
                  onSubmit={handleSubmit(handleLogin)}
                >
                  {errors.email && `Please type your email`}
                  <br />
                  {errors.password && `Please type your password`}
                  <Stack spacing={4}>
                    <Input
                      ref={register({
                        required: true,
                      })}
                      placeholder="Email"
                      name="email"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                    <Input
                      ref={register({
                        required: true,
                      })}
                      placeholder="Password"
                      type="password"
                      name="password"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                  </Stack>
                  <Button
                    type={"submit"}
                    fontFamily={"heading"}
                    mt={8}
                    w={"full"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    color={"white"}
                    _hover={{
                      bgGradient: "linear(to-r, red.400,pink.400)",
                      boxShadow: "xl",
                    }}
                  >
                    Log In
                      </Button>
                  {!forgotPassword && (
                    <Link onClick={() => forgotPasswordSet(true)}>
                      Forgot password?
                    </Link>
                  )}
                </Box>
              </>
            )}

            <Link onClick={() => hasAccountSet(false)}>No account?</Link>
          </>
        )}
      </Box>

    </Stack>
  );
};

