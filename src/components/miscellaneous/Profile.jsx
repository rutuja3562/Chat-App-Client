import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const Profile = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}> {children}</span>
      ) : (
        <IconButton
          onClick={onOpen}
          display={{ base: "flex" }}
          icon={<ViewIcon />}
        />
      )}
      <Modal isOpen={isOpen} size={"lg"} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h={"410px"}>
          <ModalHeader fontSize={40} display={"flex"} justifyContent={"center"}>
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection="column"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              src={user.pic}
              boxSize={"150px"}
              borderRadius={"full"}
              fit="cover"
              mb={"15px"}
            //   border="3px solid black"
            />
            <Text fontSize={{ base: "20px", md: "30px" }} >{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
