'use client';

import { CacheProvider } from '@chakra-ui/next-js';

import { Chakra as ChakraProvider } from '~/lib/components/Chakra';
import { AppProvider } from '~/lib/context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </AppProvider>
  );
};

export default Providers;
