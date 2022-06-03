import React, { ReactNode, useContext, useState } from 'react';

export type DashboardContextType = {
  password: string;
  setPassword: (value: string) => void;
};

const DashboardContext = React.createContext<DashboardContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const DashboardContextProvider = ({ children }: Props) => {
  const [password, setPassword] = useState<string>('');

  const value: DashboardContextType = {
    password,
    setPassword
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextType => {
  return useContext(DashboardContext) as DashboardContextType;
};
