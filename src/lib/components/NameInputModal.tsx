'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUserContext } from '../context';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
}

const NameInputModal = ({
  onClose,
  isOpen,
  closeOnOverlayClick = false,
}: Props) => {
  const [username, setUsername] = useState('');
  const { username: storeUsername, setUsername: setStoreUsername } =
    useUserContext();

  const onSubmit = async () => {
    try {
      const resp = await axios.post('/api/users', { username });

      const userId = resp.data.id;

      Cookies.set('user', userId, { expires: 30 });
      setStoreUsername?.(resp.data.username);

      // @ts-ignore
    } catch (err: AxiosError) {
      console.error(err.message);
    }
    onClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    setUsername(storeUsername as string);
  }, []);

  const onLogout = () => {
    setStoreUsername?.('');
    Cookies.remove('user');
    onClose();
  };

  return (
    <>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={closeOnOverlayClick}
      >
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent>
          <ModalHeader>Enter your username</ModalHeader>

          <ModalBody>
            <Input
              placeholder="@foobar"
              value={username}
              onChange={onChange}
              defaultValue={storeUsername}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onLogout}>
              Logout
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NameInputModal;
