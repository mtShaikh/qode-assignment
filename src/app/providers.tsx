'use client';

import { CacheProvider } from '@chakra-ui/next-js';

import { Chakra as ChakraProvider } from '~/lib/components/Chakra';
import { UserProvider } from '~/lib/context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </UserProvider>
  );
};

export default Providers;
