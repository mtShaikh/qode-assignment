import { Box, Flex, Image } from '@chakra-ui/react';

import type { Photo } from '../types';

import CommentView from './CommentView';

const PhotoViewer = ({ url, comments, id, user }: Photo) => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems="start"
      gap={3}
      borderWidth="1px"
      borderRadius="lg"
      p="16px"
      borderColor="gray.200"
      w="full"
    >
      <Box w="100%" marginY="auto" bgColor="gray.600">
        <Box>
          <Image w="full" src={url} alt={`${id}-photo`} />
        </Box>
      </Box>
      <CommentView username={user.username} photoId={id} comments={comments} />
    </Flex>
  );
};

export default PhotoViewer;
