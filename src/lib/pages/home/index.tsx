'use client';

import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import NameInputModal from '~/lib/components/NameInputModal';
import PhotoViewer from '~/lib/components/PhotoViewer';
import UploadFile from '~/lib/components/UploadFile';
import { useUserContext } from '~/lib/context';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUsername } = useUserContext();

  const fetchUsername = async () => {
    try {
      const resp = await axios.get('/api/users/me');

      setUsername?.(resp.data.username);

      // @ts-ignore
    } catch (err: AxiosError) {
      console.error(err.message);
    }
  };

  /* set username on page load 
     if user not set, open username modal
  */
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      fetchUsername();
    } else {
      onOpen();
    }
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
