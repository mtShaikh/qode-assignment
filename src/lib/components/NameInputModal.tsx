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
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocalStorage } from '~/app/hooks/useLocalStorage';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const NameInputModal = ({ onOpen, onClose, isOpen }: Props) => {
  const [username, setUsername] = useState('');
  const { storedValue, setValue } = useLocalStorage<string>('username', '');
  const onSubmit = () => {
    setValue(username);
    onClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    setUsername(storedValue);
  }, []);

  return (
    <>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent>
          <ModalHeader>Enter your username</ModalHeader>

          <ModalBody>
            <Input
              placeholder="@foobar"
              value={username}
              onChange={onChange}
              defaultValue={storedValue}
            />
          </ModalBody>

          <ModalFooter>
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
