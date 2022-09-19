import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chat");
    }
  }, [navigate]);
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d="flex"
        justifyContent={"center"}
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth="1px"
      >
        <Text fontSize={"2xl"}>Chat App</Text>
      </Box>
      <Box w="100%" bg="white" p="4" borderRadius={"lg"} borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme={"green"}>
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
