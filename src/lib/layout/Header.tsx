'use client';

import { Box, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';

import ThemeToggle from './ThemeToggle';
import NameInputModal from '../components/NameInputModal';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context';

const Header = () => {
  const [username, setUsername] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username: storeUsername } = useAppContext();

  /* update username in header on context update */
  useEffect(() => {
    setUsername(storeUsername);
  }, [storeUsername]);

  return (
    <>
      <Flex as="header" width="full" align="center" justifyContent="center">
        <Text fontSize={40} fontWeight="bold">
          the gram
        </Text>
        <Box
          marginLeft="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <Link fontSize={20} fontWeight="semibold" onClick={onOpen}>
            @{username}
          </Link>
          <Box>
            <ThemeToggle />
          </Box>
        </Box>
      </Flex>
      <NameInputModal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Header;
