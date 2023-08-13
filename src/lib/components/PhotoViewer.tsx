import { ChatIcon } from '@chakra-ui/icons';
import {
  Flex,
  Image,
  Box,
  VStack,
  Text,
  StackDivider,
  InputGroup,
  Input,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';

const PhotoViewer = () => (
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
    <Flex
      direction="column"
      justify="space-between"
      overflowX="unset"
      w={{ base: 'full', md: '40%' }}
      h="500px"
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        overflowY="auto"
        spacing={4}
      >
        <Box w="full" display="flex">
          <Text fontSize={20} fontWeight="semibold">
            UserA:&nbsp;
          </Text>
          <Text fontSize={20} fontWeight="normal">
            helloworld
          </Text>
        </Box>
      </VStack>
      <Box display={'flex'} alignSelf="end">
        <InputGroup size="md">
          <Input
            pr="2.5rem"
            paddingInlineStart="0.5rem"
            // type={show ? 'text' : 'password'}
            placeholder="Add your comment"
          />
          <InputRightElement width="2.5rem">
            <IconButton
              isRound={false}
              borderRadius="md"
              aria-label="commnet"
              icon={<ChatIcon />}
              fontSize="22px"
              size="md"
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        {/* <Textarea placeholder="Add your comment" />{' '} */}
      </Box>
    </Flex>
  </Flex>
);

export default PhotoViewer;
