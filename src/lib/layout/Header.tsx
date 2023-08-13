'use client';

import { Box, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';

import ThemeToggle from './ThemeToggle';
import { useLocalStorage } from '~/app/hooks/useLocalStorage';
import NameInputModal from '../components/NameInputModal';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { storedValue: username } = useLocalStorage<string>('username', '');

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
      <NameInputModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default Header;
