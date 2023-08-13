import { Box, Button, Flex, Heading, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';

const Page500 = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <Box marginY={4}>
        <Heading textAlign="center" size="lg">
          Oops! Something went wrong at our end 🙇‍♂️.
        </Heading>

        <Box textAlign="center" marginTop={4}>
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

export default Page500;
