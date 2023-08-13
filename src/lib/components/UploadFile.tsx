import { Button, Input } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';

const UploadFile = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    // props.handleFile(fileUploaded);
  };

  return (
    <>
      <Button onClick={handleClick} colorScheme="green">
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
