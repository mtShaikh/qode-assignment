'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <Box marginY={4}>
        <Heading textAlign="center" size="lg">
          Page not Found.
        </Heading>

        <Box textAlign="center" marginTop={4}>
          <Text fontSize="sm" color="gray">
            It&apos;s Okay!
          </Text>
          <Button
            as={Link}
            href="/"
            backgroundColor={colorMode === 'light' ? 'gray.300' : 'teal.500'}
            size="sm"
          >
            Let&apos;s Head Back
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Page404;
