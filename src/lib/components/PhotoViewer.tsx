import { Box, Flex, Image } from '@chakra-ui/react';
import CommentView from './CommentView';

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
    <CommentView />
  </Flex>
);

export default PhotoViewer;
