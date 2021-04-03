import { useState, useEffect, useContext } from "react";
import { UserContext } from "../lib/context";
import { updateProfilePicture } from "../utils/db";
import { firestore, storage, STATE_CHANGED } from "../lib/firebase";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useForm, Controller } from "react-hook-form";
import {
  Divider,
  Flex,
  Stack,
  chakra,
  InputLeftAddon,
  InputGroup,
  FormControl,
  FormHelperText,
  Input,
  Button,
  Select,
  Text,
  Box,
  Switch,
  FormLabel,
  RadioGroup,
  Radio,
  Progress,
  Spacer,
  useToast,
  VStack,
  Heading,
  useColorModeValue,
  Code,
  HStack,
} from "@chakra-ui/react";

const yearOfBirths = [];

const currentYear = new Date().getFullYear();

for (let i = currentYear; i >= 1950; i--) {
  yearOfBirths.push(i);
}

export default function Bio({
  avatarCoverImg,
  avatarCoverImgSet,
  dashboardFormSet,
}) {
  const [uploading, setUploading] = useState({ avatar: false, cover: false });
  const [progress, setProgress] = useState(0);
  const [downloadURL, downloadURLSet] = useState({
    avatar: null,
    cover: null,
  });
  const [imageFileChosenName, imageFileChosenNameSet] = useState({
    avatar: "click here",
    cover: "click here",
  });
  const [googleLoc, googleLocSet] = useState(null);
  const [disabled, disabledSet] = useState(false);
  const [currentLocation, currentLocationSet] = useState("no value");
  const [radioEdu, radioEduSet] = useState<number | string>(null);
  const [radioGender, radioGenderSet] = useState<number | string>(null);
  const [colabSwitch, colabSwitchSet] = useState(false);
  const [teachingSwitch, teachingSwitchSet] = useState(false);

  const { register, handleSubmit, errors, control, setValue } = useForm({
    defaultValues: {
      stagename: "",
      location: "",
      skills: "",
      influences: "",
      education: "",
      collaboration: false,
      styles: "",
      gender: "",
      birthdate: "",
    },
  });

  const { user } = useContext(UserContext);

  const toast = useToast();

  const query = firestore.collection("users").where("uid", "==", user.uid);

  useEffect(() => {
    query.where("uid", "==", user.uid).onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((i) => {
        const doc = i.doc.data();
        avatarCoverImgSet({
          ...avatarCoverImg,
          avatar: doc.profileImg,
          cover: doc.coverImg,
        });

        const skills = doc?.bio?.skills;
        const stagename = doc?.bio?.stagename;
        const influences = doc?.bio?.influences;
        const education = doc?.bio?.education;
        const styles = doc?.bio?.styles;
        const gender = doc?.bio?.gender;
        const birthdate = doc?.bio?.birthdate;
        const location = doc?.bio?.location;
        const collaboration = doc?.bio?.collaboration;
        const teaching = doc?.bio?.teaching;

        setValue("stagename", stagename);
        setValue("skills", skills);
        setValue("influences", influences);
        setValue("education", education);
        setValue("styles", styles);
        setValue("gender", gender);
        setValue("birthdate", birthdate);

        currentLocationSet(location);
        colabSwitchSet(collaboration);
        colabSwitchSet(teaching);
      });
    });
  }, [user.uid]);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const extension = file["type"].split("/")[1];

    if (name === "avatar") {
      imageFileChosenNameSet({
        ...imageFileChosenName,
        avatar: file["name"],
      });

      const ref = storage.ref(
        `uploads/${user.uid}/avatar-${Date.now()}.${extension}`
      );

      setUploading({ ...uploading, avatar: true });

      const task = ref.put(file);

      task.on(STATE_CHANGED, (snapshot) => {
        const pct = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        setProgress(+pct);
      });

      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          downloadURLSet({ ...downloadURL, avatar: url });
          updateProfilePicture(user.uid, url);
          setUploading({ ...uploading, avatar: false });
          toast({
            title: "Profile image updated.",
            status: "success",
            duration: 2000,
            isClosable: false,
          });
        });
    } else {
      imageFileChosenNameSet({
        ...imageFileChosenName,
        cover: file["name"],
      });
      const ref = storage.ref(
        `uploads/${user.uid}/cover-${Date.now()}.${extension}`
      );

      setUploading({ ...uploading, cover: true });

      const task = ref.put(file);

      task.on(STATE_CHANGED, (snapshot) => {
        const pct = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        setProgress(+pct);
      });

      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          downloadURLSet({ ...downloadURL, cover: url });
          updateProfilePicture(user.uid, url);
          setUploading({ ...uploading, cover: false });
          toast({
            title: "Cover image updated.",
            status: "success",
            duration: 2000,
            isClosable: false,
          });
        });
    }
  };

  const onSubmit = (data) => {
    if (!googleLoc) {
      toast({
        title: "Error",
        description: "Please type your location",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    } else {
      disabledSet(true);

      const bio = {
        ...data,
        location: googleLoc?.label,
      };

      dashboardFormSet(bio);

      firestore
        .collection("users")
        .doc(user.uid)
        .update({ bio: bio })
        .finally(() => disabledSet(false));
    }
  };

  return (
    <Flex flexDirection="column" w={["90vw", "70vw", "sm", "30vw"]}>
      <VStack my={"6"}>
        <Heading borderBottom={"1px"} pb={2} fontWeight="500" as="h1">
          Bio Information
        </Heading>
        <Text
          fontSize={["xl", "2xl"]}
          color={useColorModeValue("gray.500", "gray.200")}
          maxW="lg"
          textAlign="center"
        >
          Add your carrier details
        </Text>
      </VStack>
      <Stack>
        <InputGroup>
          <InputLeftAddon children="📸 Profile Image" />
          <Flex
            w="100%"
            whiteSpace="nowrap"
            px={4}
            align="center"
            borderWidth={1}
            borderRightRadius="md"
          >
            {imageFileChosenName.avatar.split("").slice(0, 20)}
            <chakra.input
              name="avatar"
              type="file"
              onChange={(e) => uploadFile(e)}
              w="100%"
              opacity={0}
              pos="absolute"
              inset="0"
            />
          </Flex>
        </InputGroup>

        {uploading.avatar && (
          <Progress
            hasStripe
            size="xs"
            colorScheme="green"
            isIndeterminate={uploading.avatar}
            value={progress > 0 ? progress : 0}
          />
        )}

        <InputGroup>
          <InputLeftAddon children="🖼️ Cover Background" />
          <Flex
            w="100%"
            whiteSpace="nowrap"
            px={4}
            align="center"
            borderWidth={1}
            borderRightRadius="md"
          >
            {imageFileChosenName.cover.split("").slice(0, 20)}
            <chakra.input
              name="coverImg"
              type="file"
              onChange={(e) => uploadFile(e)}
              w="100%"
              opacity={0}
              pos="absolute"
              inset="0"
            />
          </Flex>
        </InputGroup>

        {uploading.cover && (
          <Progress
            hasStripe
            size="xs"
            colorScheme="green"
            isIndeterminate={uploading.cover}
            value={progress > 0 ? progress : 0}
          />
        )}
      </Stack>

      <Divider my={6} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack width="100%" spacing={6}>
          <FormControl>
            <InputGroup>
              <InputLeftAddon children="👩‍🎤 Stage Name" />
              <Input
                isDisabled={disabled}
                type="text"
                name="stagename"
                placeholder="Lexi Rose"
                ref={register({ required: true })}
              />
            </InputGroup>
            <FormHelperText textAlign="left">
              Displays on your card in front page.
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftAddon children="Birthdate" />
              <Select
                isDisabled={disabled}
                name="birthdate"
                placeholder="Year of Birth"
                ref={register({ required: true })}
              >
                {yearOfBirths.map((i, idx) => (
                  <option key={idx} value={i}>
                    {i}
                  </option>
                ))}
              </Select>
            </InputGroup>

            <FormHelperText textAlign="left">
              It won't be published on your profile page. Only for query through
              our search engine.
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftAddon children="📍Location" />
              <Box w={"100%"}>
                <GooglePlacesAutocomplete
                  apiKey={process.env.NEXT_PUBLIC_API_KEY}
                  selectProps={{
                    name: "googleLocation",
                    required: true,
                    isDisabled: disabled,
                    googleLoc,
                    onChange: googleLocSet,
                    styles: {
                      input: (provided) => ({
                        ...provided,
                        paddingBottom: "2px",
                      }),
                      option: (provided) => ({
                        ...provided,
                        color: "gray",
                        backgroundColor: "white",
                      }),
                    },
                  }}
                />
              </Box>
            </InputGroup>
            <FormHelperText textAlign="left">
              Current location:{" "}
              <Code colorScheme="green">{currentLocation}</Code>
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftAddon children="💯 Skills" />
              <Input
                isDisabled={disabled}
                type="text"
                name="skills"
                placeholder="Guitar, Drum, Piano, Edit & Master, Base"
                ref={register({ required: true })}
              />
            </InputGroup>
            <FormHelperText textAlign="left">
              Top 5 skills seprating with comma
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftAddon children="🎵 Styles" />
              <Input
                isDisabled={disabled}
                type="text"
                name="styles"
                placeholder="Rock, Pop, Jazz"
                ref={register({ required: true })}
              />
            </InputGroup>
            <FormHelperText textAlign="left">
              Top 3 styles seprating with comma
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftAddon children="🔥 Influences" />
              <Input
                isDisabled={disabled}
                type="text"
                name="influences"
                placeholder="Metallica, Pink Floyd, Coldplay"
                ref={register({ required: true })}
              />
            </InputGroup>
            <FormHelperText textAlign="left">
              Top 5 influences seprating with comma
            </FormHelperText>
          </FormControl>

          <Controller
            as={
              <RadioGroup
                rounded={"xl"}
                px={4}
                py={3}
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                bg="gray.700"
                color={"green.400"}
                align={"center"}
                size={"md"}
                ref={register}
                onChange={radioGenderSet}
                value={radioGender}
              >
                <Stack direction="row">
                  <Text fontSize={["sm", "lg"]}>👾 Gender:</Text>
                  <Spacer />
                  <Radio isDisabled={disabled} name="female" value="female">
                    👩‍🎤 Female
                  </Radio>
                  <Radio isDisabled={disabled} name="male" value="male">
                    👨‍🎤 Male
                  </Radio>
                  <Radio
                    isDisabled={disabled}
                    name="non-binary"
                    value="non-binary"
                  >
                    Non-binary
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="gender"
            control={control}
          />

          <Controller
            as={
              <RadioGroup
                rounded={"xl"}
                px={4}
                py={3}
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                bg="gray.700"
                color={"green.400"}
                align={"center"}
                size={"md"}
                ref={register}
                onChange={radioEduSet}
                value={radioEdu}
              >
                <Stack direction="row">
                  <Text>📚 Education:</Text>
                  <Spacer />
                  <Radio
                    isDisabled={disabled}
                    name="self-taught"
                    value="self-taught"
                  >
                    🎸 Self-taught
                  </Radio>
                  <Radio isDisabled={disabled} name="academic" value="academic">
                    🎓 Academic
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="education"
            control={control}
          />

          <HStack>
            <FormControl
              rounded={"xl"}
              px={4}
              py={3}
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              bg="gray.700"
              color={"green.400"}
              align={"center"}
              display="flex"
            >
              <FormLabel htmlFor="collaboration" mb="0">
                🟢 Collaboration?
              </FormLabel>
              <Switch
                isChecked={colabSwitch}
                // value={colabSwitch}
                onChange={() => colabSwitchSet((p) => !p)}
                isDisabled={disabled}
                name="collaboration"
                size={"lg"}
                colorScheme={"green"}
                ref={register}
              />
            </FormControl>

            <FormControl
              rounded={"xl"}
              px={4}
              py={3}
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              bg="gray.700"
              color={"green.400"}
              align={"center"}
              display="flex"
            >
              <FormLabel htmlFor="teaching" mb="0">
                🟣 Teaching?
              </FormLabel>
              <Switch
                isChecked={teachingSwitch}
                // value={teachingSwitch}
                onChange={() => teachingSwitchSet((p) => !p)}
                isDisabled={disabled}
                name="teaching"
                size={"lg"}
                colorScheme={"green"}
                ref={register}
              />
            </FormControl>
          </HStack>

          <Button
            isLoading={disabled}
            disabled={disabled}
            type="submit"
            colorScheme="green"
          >
            Update
          </Button>
        </Stack>
      </form>
    </Flex>
  );
}
