import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
// import { stripBasename } from "@remix-run/router";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [show, setShow] = React.useState(false);
  const [ pic,setPic] = useState();
  const [ picLoading, setPicLoading] = useState(false);
  const [loading,setLoading]=useState(false)
  const handleClick = () => setShow(!show);
  // const navigate=useNavigate()
  const toast = useToast();
  const postDetails = (pics) => {
    setLoading(true)
    // setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chatapp");
      data.append("cloud_name", "rutujapatil");
      fetch("https://api.cloudinary.com/v1_1/rutujapatil/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log("url",data.url.toString());
          console.log(setPic)
          setPicLoading(false);
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
          setLoading(false)
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    if (name==="" || email ==="" || password ===""  || confirmpass ==="" ) {
      toast({
        title: "Please fill all Field.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (password !== confirmpass) {
      toast({
        title: "Please fill all Field.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      await axios.post(
        "http://localhost:5000/register",
        { name, email, password ,pic},
        config
      );
      console.log("success");
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
    } catch (e) {
      console.log(e.message);
      toast({
        title: "Email Already Exist",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl isRequired>
        <FormLabel>Name </FormLabel>
        <Input
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email </FormLabel>
        <Input
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              colorScheme={"green"}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter Confirmed Password"
            value={confirmpass}
            onChange={(e) => setConfirmpass(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              colorScheme={"green"}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          marginBottom={"15px"}
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        w="100%"
        style={{ marginTop: "15" }}
        colorScheme={"green"}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
