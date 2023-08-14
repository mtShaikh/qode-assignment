import { Button, Input, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';

import { useAppContext } from '../context';

const UploadFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setRefreshPhoto } = useAppContext();

  const toast = useToast();

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file?.type as string)) {
      toast({
        position: 'top-right',
        title: 'Only JPEG, PNG, and GIF images are allowed.',
        status: 'error',
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', file as Blob);
    formData.append('upload_preset', 'v2ewuevm');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload`,
        formData
      );
      // upload response.secure_url to server

      await axios.post('/api/photos', {
        url: response.data.secure_url,
      });

      toast({
        position: 'top-right',
        title: 'Photo uploaded successfully',
        status: 'success',
      });

      setRefreshPhoto?.(true);
    } catch {
      toast({
        position: 'top-right',
        title: 'Something went wrong',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        spinner={<Spinner />}
        isLoading={isLoading}
        onClick={handleClick}
        colorScheme="green"
      >
        Upload Photo
      </Button>
      <Input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        display="none"
      />
    </>
  );
};

export default UploadFile;
