import {
  Flex,
  Image,
  Box,
  VStack,
  Text,
  StackDivider,
  Textarea,
} from '@chakra-ui/react';

const PhotoContainer = () => (
  <Flex
    direction={{ base: 'column', md: 'row' }}
    alignItems="start"
    gap={3}
    borderWidth="1px"
    borderRadius="lg"
    p="16px"
    borderColor="gray.200"
    // mb={8}
    w="full"
  >
    <Box w="100%">
      <Image w="full" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
    </Box>
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      overflowY="scroll"
      overflowX="unset"
      spacing={4}
      w={{ base: 'full', md: '40%' }}
      justify="space-between"
      h="500px"
    >
      <Box w="full" display="flex">
        <Text fontSize={20} fontWeight="semibold">
          UserA:&nbsp;
        </Text>
        <Text fontSize={20} fontWeight="normal">
          helloworld
        </Text>
      </Box>
      <Textarea placeholder="Add your comment" />
    </VStack>
  </Flex>
);

export default PhotoContainer;
