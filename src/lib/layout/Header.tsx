'use client';

import { Box, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import NameInputModal from '../components/NameInputModal';
import { useAppContext } from '../context';

import ThemeToggle from './ThemeToggle';

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
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <Link fontSize={20} fontWeight="semibold" onClick={onOpen}>
            {username ? `@${username}` : 'Login'}
          </Link>
          <Box>
            <ThemeToggle />
          </Box>
        </Box>
      </Flex>
      <NameInputModal closeOnOverlayClick isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
