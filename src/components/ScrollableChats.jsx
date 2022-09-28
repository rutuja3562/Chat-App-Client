import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ScrollElement } from "react-scroll";
import { chatContex } from "../Contex/ChatProvider";
// import  scrollable-component  from "scrollable-component";
import { ScrollableComponentElement } from 'scrollable-component';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./configs/ChatLogic";

const ScrollableChats = ({ messages }) => {
  const { user } = useContext(chatContex);
  console.log("user", user.user);
  return (
    <scrollable-component scrollbar-visibility="none">
      {messages &&
        messages.map((m, i) => {
          return (
            <Box display={"flex"}  key={i}>
              {(isSameSender(messages, m, i, user.user._id) ||
                isLastMessage(messages, i, user.user._id)) && (
                <Tooltip label={"ll"} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user.user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "10px",
                  padding: "5px 20px",
                  maxWidth: "75%",
                }}
              >
               
                {m.content}
              </span>
            </Box>
          );
        })}
    </scrollable-component>
  );
};

export default ScrollableChats;
