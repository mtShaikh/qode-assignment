import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface ContextInterface {
  username?: string;
  setUsername?: React.Dispatch<React.SetStateAction<string>>;
  refreshPhoto?: boolean;
  setRefreshPhoto?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext({} as ContextInterface);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState<string>('');

  /* using state var to keep track of new photos added */
  const [refreshPhoto, setRefreshPhoto] = useState<boolean>(false);
  return (
    <AppContext.Provider
      value={{ username, setUsername, refreshPhoto, setRefreshPhoto }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): ContextInterface => {
  return useContext(AppContext);
};
