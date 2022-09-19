import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
// import {useNavigate} from "react-router-dom";

export const chatContex = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chat, setChat] = useState([]);
  //   const navigate = useNavigate()
  // const histry =useHistry()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
    }
  }, []);
  return (
    <chatContex.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chat, setChat }}
    >
      {children}
    </chatContex.Provider>
  );
};
