import React, { useContext, useEffect, useState } from "react";
import { chatContex } from "../../Contex/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../configs/ChatLogic";
import Profile from "../miscellaneous/Profile";
import axios from "axios";
import ScrollableChats from "../ScrollableChats";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();
  const { user, chat, setChat, selectedChat, setSelectedChat } =
    useContext(chatContex);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);

      // socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  const sendMessage = async (event) => {
    if (event.key === "Enter") {
      console.log("token:", user.token);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        // console.log("data",data)

        setMessages([...messages, data]);
      } catch (e) {
        console.log(e);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indicator
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupchat ? (
              <>
                <Box display={"flex"} justifyContent="space-between">
                  {getSender(user, selectedChat.users)}
                  <Profile
                    user={getSenderFull(user, selectedChat.users)}
                    display={"flex"}
                    alignItems="end"
                  />
                </Box>
              </>
            ) : (
              <>
                {selectedChat.chatname.toUpperCase()}
                {/*   <UpdateGroupChatModal
                fetchMessages={fetchMessages}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            fetchMessage={fetchmessage}
          />*/}
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box
                // style={{
                display="flex"
                flexDirection="column"
                overflowY="scroll"
                scrollbarWidth="none"
                justifyContent="flex-end"
                padding={3}
                bg="#E8E8E8"
                width="100%"
                height="100%"
                borderRadius="lg"
                // overflowY="hidden"
                // }}
              >
                <ScrollableChats
                  messages={messages}
                  // style={{ border: "1px solid blue" }}
                />
              </Box>
            )}
            <FormControl
              onKeyDown={sendMessage}
              isRequired
              mt={3}
              id="first-name"
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                position="bottom"
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          h="100%"
          bg={"lightgray"}
        >
          <Text fontSize={"3xl"} pb={3}>
            Click on User to start Chating
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
