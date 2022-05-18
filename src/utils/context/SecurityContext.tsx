import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useAsync } from 'hooks/useAsync';

const loadPassword = async (): Promise<string> => {
  const localStorage = window.localStorage;
  return localStorage.getItem('password') ?? '';
};

const savePassword = (password: string) => {
  const localStorage = window.localStorage;
  localStorage.setItem('password', password);
};

export type SecurityContextType = {
  password: string;
  setPassword: (value: string) => void;

  allowed: boolean;
  ready: boolean;
};

const SecurityContext = React.createContext<SecurityContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const SecurityContextProvider = ({ children }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [allowed, setAllowed] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (password === 'pixel') {
      savePassword(password);
      setAllowed(true);
    }

    if (password) {
      setReady(true);
    }
  }, [password]);

  // load password from localstorage async
  useAsync<string>(loadPassword, (data) => {
    setPassword(data);
  });

  const value: SecurityContextType = {
    password,
    setPassword,
    allowed,
    ready
  };

  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>;
};

export const useSecurityContext = (): SecurityContextType => {
  return useContext(SecurityContext) as SecurityContextType;
};
