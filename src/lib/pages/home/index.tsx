'use client';

import { Flex, Box, Button } from '@chakra-ui/react';
import PhotoViewer from '~/lib/components/PhotoViewer';

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
        <Button colorScheme="green">Upload Photo</Button>
      </Box>
    </Flex>
  );
};

export default Home;
