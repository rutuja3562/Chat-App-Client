import React, { useContext } from "react";
import { chatContex } from "../../Contex/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../configs/ChatLogic";
import Profile from "../miscellaneous/Profile";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  //   const [user, setUser, selectedChat, setSelectedChat, chat, setChat] = useContext(chatContex);
  const { user, chat, setChat, selectedChat, setSelectedChat } =
    useContext(chatContex);
  return (
    <>
      {selectedChat ? (
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
            <>{selectedChat.chatname.toUpperCase()}
            </>
          )}
        </Text>
       
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
