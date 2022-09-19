import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { chatContex } from "../Contex/ChatProvider";
import SingleChat from "./userAvatar/SingleChat";

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = useContext(chatContex);
  return (
    <Box
      dispaly={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir={"column"}
      // w={{ base: "100%", md: "68%" }}
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth={"1px"}
      padding={3}
      h="100%"
    >
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  );
};

export default ChatBox;
