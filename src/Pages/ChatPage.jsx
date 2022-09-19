import { Box } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ChatBox from "../components/ChatBox";
import SideDrower from "../components/miscellaneous/SideDrower";
import MyChat from "../components/MyChat";
import { chatContex } from "../Contex/ChatProvider";

const Chat = () => {
  const { user } = useContext(chatContex);
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%", color: "white" }}>
      {user && <SideDrower />}

      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="93.5vh"
        p="10px"
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
