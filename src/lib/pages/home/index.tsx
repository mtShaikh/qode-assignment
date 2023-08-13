'use client';

import { Flex } from '@chakra-ui/react';
import PhotoContainer from '~/lib/components/PhotoContainer';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <PhotoContainer />
    </Flex>
  );
};

export default Home;
