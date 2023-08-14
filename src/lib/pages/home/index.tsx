'use client';

import {
  Box,
  Flex,
  useDisclosure,
  useToast,
  Text,
  Button,
} from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import NameInputModal from '~/lib/components/NameInputModal';
import PhotoViewer from '~/lib/components/PhotoViewer';
import UploadFile from '~/lib/components/UploadFile';
import { useAppContext } from '~/lib/context';
import { Photo } from '~/lib/types';

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
      // @ts-ignore
    } catch (err: AxiosError) {
      toast({
        position: 'top-right',
        title: 'Something went wrong',
        status: 'error',
      });

      console.error(err.message);
    }
  };

  const fetchUsername = async () => {
    try {
      const resp = await axios.get('/api/users/me');

      setUsername?.(resp.data.username);

      // @ts-ignore
    } catch (err: AxiosError) {
      toast({
        position: 'top-right',
        title: 'Something went wrong',
        status: 'error',
      });

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
      fetchPhotos();
    } else {
      onOpen();
    }
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
        {photos.map((photo, i) => (
          <PhotoViewer {...photo} key={`${photo.id}-${i}`} />
        ))}

        <Box pos="sticky" bottom="5">
          <UploadFile />
        </Box>
      </Flex>
      <NameInputModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default Home;
