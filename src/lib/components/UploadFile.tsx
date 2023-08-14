import { Button, Input, Spinner, useToast } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
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
    const file = event.target.files?.[0];
    event.preventDefault();
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

      //@ts-ignore
    } catch (error: AxiosError) {
      console.error(error.message);

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
