import { Box, Flex, Text } from '@chakra-ui/react';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" justifyContent="center">
      <Text fontSize={40} fontWeight="bold">
        the gram
      </Text>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
