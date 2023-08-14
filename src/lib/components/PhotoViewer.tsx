import { Box, Flex, Image } from '@chakra-ui/react';
import CommentView from './CommentView';
import { Photo } from '../types';

const PhotoViewer = ({ url, comments, id }: Photo) => {
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
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyItems="center"
        marginY="auto"
      >
        <Image w="full" src={url} alt={`${id}-photo`} />
      </Box>
      <CommentView photoId={id} comments={comments} />
    </Flex>
  );
};

export default PhotoViewer;
