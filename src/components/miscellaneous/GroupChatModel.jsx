import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { chatContex } from "../../Contex/ChatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
const GroupChatModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gropChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [serchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chat, setChat } = useContext(chatContex);
  // console.log("token",user.token)
  const handleSearch = async (q) => {
    setSearch(q);
    if (!q) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/users?search=${q}`,
        config
      );
      setSearchResults(data);
      console.log("searchdata", data);
      setLoading(false);
    } catch (e) {
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
  const handleSubmit = async () => {
    if (!gropChatName|| !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/chat/group",
        {
          name: gropChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChat([data, ...chat]);
      console.log("selecteduserdata",data)
      console.log("chat",chat)
      onClose();
    } catch (e) {
      toast({
        title: "Failed to Create the Chat!",
        description: e.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleGroup = (u) => {
    if (selectedUsers.includes(u)) {
      toast({
        title: "User already there",
        // description: "Failed to Load the Search Results",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setSelectedUsers([...selectedUsers, u]);
  };
  const handleDelete = (userdelete) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== userdelete._id)
    );
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={gropChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                // onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users name"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display={"flex"} flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>loading</div>
            ) : (
              serchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Creat Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModel;
