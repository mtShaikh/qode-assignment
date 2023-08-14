import { ChatIcon } from '@chakra-ui/icons';
import {
  Flex,
  VStack,
  StackDivider,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Box,
  Text,
} from '@chakra-ui/react';

const CommentView = () => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      overflowX="unset"
      w={{ base: 'full', md: '36%' }}
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
            fontSize="12px"
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
  );
};

export default CommentView;
