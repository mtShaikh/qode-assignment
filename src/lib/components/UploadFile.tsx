import { Button, Input, Spinner } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';

const UploadFile = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(response);
      // upload response.secure_url to server

      //@ts-ignore
    } catch (error: AxiosError) {
      console.error(error.message);
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
