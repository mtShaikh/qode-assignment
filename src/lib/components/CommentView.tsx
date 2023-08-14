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
  useToast,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Comment } from '~/lib/types';

interface Props {
  photoId: string;
  comments: Comment[];
  username: string;
}

const CommentView = ({ photoId, username, comments }: Props) => {
  const [message, setMessage] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const postComment = async () => {
    if (!message) return;
    try {
      setIsLoading(true);
      const resp = await axios.post('/api/comments', { photoId, message });
      const newComment = resp.data;
      setCommentList((prev) => [...prev, newComment]);

      // @ts-ignore
    } catch (err: AxiosError) {
      toast({
        position: 'top-right',
        title: 'Something went wrong',
        status: 'error',
      });

      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

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
        {commentList.map((comment, i) => (
          <Box key={`${comment.id}-${i}`} w="full" display="flex">
            <Text fontSize={14} fontWeight="semibold">
              @{comment.user.username}:&nbsp;
            </Text>
            <Text fontSize={14} fontWeight="normal">
              {comment.message}
            </Text>
          </Box>
        ))}
      </VStack>
      <Box display={'flex'} gap={2} flexDirection={'column'} alignSelf="end">
        <Text fontSize={14}>Posted By: @{username}</Text>
        <InputGroup size="md">
          <Input
            onChange={onChange}
            pr="2.5rem"
            paddingInlineStart="0.5rem"
            fontSize="12px"
            placeholder="Add your comment"
          />
          <InputRightElement width="2.5rem">
            <IconButton
              isLoading={isLoading}
              spinner={<Spinner />}
              onClick={postComment}
              isRound={false}
              borderRadius="md"
              aria-label="commnet"
              icon={<ChatIcon />}
              fontSize="22px"
              left="1px"
              h="2.75rem"
              w="2.75rem"
            ></IconButton>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default CommentView;
