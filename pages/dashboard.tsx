import { useState } from "react";
import Username from "../components/Username";
import PhonePreview from "../components/PhonePreview";
import Links from "../components/Links";
import Navigation from "../components/Navigation";
import Bio from "../components/Bio";
import Design from "../components/Design";
import AuthCheck from "../components/AuthCheck";
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
} from "@chakra-ui/react";

const defaultValues = {
  stagename: "",
  location: "",
  skills: "",
  influences: "",
  education: "",
  collaboration: false,
};

export default function Dashboard(props) {
  return (
    <AuthCheck>
      <DashboardPanel />
    </AuthCheck>
  );
}

const DashboardPanel = () => {
  const [urls, urlsSet] = useState([]);
  const [formValue, formValueSet] = useState("");
  const [userNameValue, userNameValueSet] = useState("");
  const [avatarCoverImg, avatarCoverImgSet] = useState({
    avatar: "",
    cover: "",
  });
  const [dashboardForm, dashboardFormSet] = useState(defaultValues);
  const [tabIndex, tabIndexSet] = useState(0);
  const [bgColor, bgColorSet] = useState("#1a202c");

  return (
    <>
      <Flex
        height="100vh"
        justifyContent="space-between"
        w='100%'
        flexDirection={['column', 'column', 'row', 'row']}
        columns={[1, 1, 3, 3]}
        // spacing={5}
        // display='flex'
        // pos='relative'
        // alignItems='stretch'
        minW={["xs", "sm", "md", "xl"]}

      // flexDir={["column", "column", "column", "row"]}
      >
        <Tabs
          alignSelf="stretch"
          minW={["xs", "sm", "md", "4xl"]}
          overflow="scroll"
          overflowX="hidden"
          minH="100vh"
          defaultIndex={1}
          // paddingTop="3"
          isFitted
          align="center"
          variant="line"
          colorScheme="green"
          index={tabIndex ? tabIndex : 0}
          // pb={'28'}
          // bg={'gray.600'}
          onChange={(index) => tabIndexSet(index)}
        >
          <TabList>
            <Tab _selected={{ color: "white", bg: "green.400" }}>
              <Box>🔗</Box>
              <Text ml={3}>Links</Text>
            </Tab>

            <Tab _selected={{ color: "white", bg: "green.400" }}>
              <Box>✍️</Box>
              <Text ml={3}>Bio</Text>
            </Tab>

            <Tab _selected={{ color: "white", bg: "green.400" }}>
              <Box>🎨</Box>
              <Text ml={3}>Design</Text>
            </Tab>

            <Tab _selected={{ color: "white", bg: "green.400" }}>
              <Box>👑</Box>
              <Text ml={3}>Username</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Links urlsSet={urlsSet} />
            </TabPanel>

            <TabPanel>
              <Bio
                avatarCoverImg={avatarCoverImg}
                avatarCoverImgSet={avatarCoverImgSet}
                dashboardFormSet={dashboardFormSet}
              />
            </TabPanel>

            <TabPanel>
              <Design bgColorSet={bgColorSet} />
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

        <PhonePreview
          tabIndex={tabIndex}
          tabIndexSet={tabIndexSet}
          urls={urls}
          userNameValue={userNameValue}
          avatarCoverImg={avatarCoverImg}
          // dashboardForm={dashboardForm}
          bgColor={bgColor}
        />
      </Flex>
      <style global jsx>{`
        ::-webkit-scrollbar {
          width: 0.15rem;
        }

        ::-webkit-scrollbar-thumb {
          background: #48bb78;
        }

        ::-webkit-scrollbar-track {
          background: #111;
        }
      `}</style>
    </>
  );
};
