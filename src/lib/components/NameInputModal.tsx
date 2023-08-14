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
  Spinner,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { useAppContext } from '../context';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
}

const NameInputModal = ({
  onClose,
  isOpen,
  closeOnOverlayClick = false,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const { username: storeUsername, setUsername: setStoreUsername } =
    useAppContext();
  const toast = useToast();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.post('/api/users', { username });

      const userId = resp.data.id;

      Cookies.set('user', userId, { expires: 30 });
      setStoreUsername?.(resp.data.username);

      toast({
        position: 'top-right',
        title: 'User created',
        status: 'success',
      });
    } catch {
      toast({
        position: 'top-right',
        title: 'Something went wrong',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
    onClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    setUsername(storeUsername as string);
  }, [storeUsername]);

  const onLogout = () => {
    setStoreUsername?.('');
    Cookies.remove('user');
    onClose();
  };

  return (
    <Modal
      blockScrollOnMount
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
          <Button
            spinner={<Spinner />}
            isLoading={isLoading}
            colorScheme="blue"
            mr={3}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NameInputModal;
