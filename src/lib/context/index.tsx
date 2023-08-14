import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface ContextInterface {
  username?: string;
  setUsername?: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext({} as ContextInterface);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState<string>('');
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): ContextInterface => {
  return useContext(UserContext);
};
