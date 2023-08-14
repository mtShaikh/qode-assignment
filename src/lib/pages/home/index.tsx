'use client';

import { Box, Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import NameInputModal from '~/lib/components/NameInputModal';
import PhotoViewer from '~/lib/components/PhotoViewer';
import UploadFile from '~/lib/components/UploadFile';
import { useAppContext } from '~/lib/context';
import type { Photo } from '~/lib/types';

const Home = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { setUsername, refreshPhoto, setRefreshPhoto } = useAppContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchPhotos = async () => {
    try {
      const resp = await axios.get('/api/photos');
      setPhotos(resp.data);
      setRefreshPhoto?.(false);
    } catch {
      toast({
        position: 'top-right',
        title: 'Something went wrong',
        status: 'error',
      });
    }
  };

  const fetchUsername = async () => {
    try {
      const resp = await axios.get('/api/users/me');

      setUsername?.(resp.data.username);
    } catch {
      toast({
        position: 'top-right',
        title: 'Something went wrong',
        status: 'error',
      });
    }
  };

  /* set username on page load 
     if user not set, open username modal
  */
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      fetchUsername();
      fetchPhotos();
    } else {
      onOpen();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      <Flex
        pos="relative"
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        gap={4}
        w="full"
      >
        {refreshPhoto && (
          <Box pos="absolute" top="1rem">
            <Button colorScheme="blue" onClick={fetchPhotos}>
              {' '}
              Refresh your feed!
            </Button>
          </Box>
        )}
        {photos.map((photo) => (
          <PhotoViewer {...photo} key={`${photo.id}`} />
        ))}

        <Box pos="sticky" bottom="5">
          <UploadFile />
        </Box>
      </Flex>
      <NameInputModal isOpen={isOpen} onClose={onClose} hideLogout />
    </>
  );
};

export default Home;
