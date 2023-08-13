'use client';

import { Box, Flex } from '@chakra-ui/react';
import PhotoViewer from '~/lib/components/PhotoViewer';
import UploadFile from '~/lib/components/UploadFile';

const Home = () => {
  return (
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
  );
};

export default Home;
