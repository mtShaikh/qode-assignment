'use client';

import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocalStorage } from '~/app/hooks/useLocalStorage';
import NameInputModal from '~/lib/components/NameInputModal';
import PhotoViewer from '~/lib/components/PhotoViewer';
import UploadFile from '~/lib/components/UploadFile';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { storedValue: username } = useLocalStorage<string>('username', '');

  useEffect(() => {
    if (!username) {
      onOpen();
    }
    // this is a unique identifier for this session
    const uuid = window.crypto.randomUUID();
  }, []);

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        gap={4}
        w="full"
      >
        <PhotoViewer />
        <Box pos="sticky" bottom="5">
          <UploadFile />
        </Box>
      </Flex>
      <NameInputModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default Home;
