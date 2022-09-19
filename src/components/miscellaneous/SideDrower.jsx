import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { chatContex } from "../../Contex/ChatProvider";
import UserListItem from "../userAvatar/UserListItem";
import ChatLoading from "./ChatLoading";
import Profile from "./Profile";
const SideDrower = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, chat, setChat, setSelectedChat } = useContext(chatContex);

  const navigate = useNavigate();
  const toast = useToast();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async (d) => {
    // setLoading(true);
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      // console.log("token", user.token);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/users?search=${d}`,
        config
      );
      // console.log("data.....", data);
      setLoading(false);
      setSearchResults(data);
      // console.log("...searchResult...", searchResults);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  const accessChat = async (userId) => {
    console.log("userId" ,userId,"user token..",  user.token);

    try {
      setLoadingChat(true);
      // console.log(headers.Authorization)
      const config = {
        // headers: { "Content-type": "application/json" },

        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/chat`,
        { userId },
        config
      );
      // const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log("selected chat", data);
      if (!chat.find((c) => c._id === data._id)) setChat([data, ...chat]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (e) {
      toast({
        title: "Error fetching the chat",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        width="100%"
        display="flex"
        justifyContent={"space-between"}
        bg="white"
        p="5px 10px 5px 5px"
        color={"black"}
        textAlign="center"
        alignItems={"center"}
      >
        <Box>
          <Tooltip
            label="search something"
            hasArrow
            placement="bottom-end"
            bg="black"
          >
            <Button
              variant={"ghost"}
              _hover={{ color: "black", bg: "white" }}
              borderRadius="0"
              onClick={onOpen}
            >
              <AiOutlineSearch size={30} />
              <Text d={{ base: "none", md: "flex" }} px="4">
                Search User
              </Text>
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Text>Talk a Tive</Text>
        </Box>
        <Box display={"flex"} alignItems="center">
          <Menu>
            <MenuButton>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            {/*<MenuList></MenuList>*/}
          </Menu>
          <Menu>
            <MenuButton as={Button}>
              <Avatar size={"sm"} name={user.user.name} src={user.user.pic} />
            </MenuButton>
            <MenuList>
              <Profile user={user.user}>
                <MenuItem>Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Create your account
          </DrawerHeader>

          <DrawerBody>
            <Box width={"100%"} d="flex" pb={2}>
              <Input
                w="65%"
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={() => handleSearch(search)}>Search</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResults?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      
      </Drawer>
    </>
  );
};

export default SideDrower;
