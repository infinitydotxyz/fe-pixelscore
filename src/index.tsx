import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import 'flowbite';
import { reportWebVitals } from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider } from 'utils/context/AppContext';
import { ConnectPage } from 'pages/connect';
import { HomePage } from 'pages/home';
import { PasswordPage } from 'pages/password';
import { SecurityContextProvider, useSecurityContext } from 'utils/context/SecurityContext';
import { SandboxPage } from 'pages/sandbox';
import { DashboardPage } from 'pages/dashboard';
import { DashboardAll } from 'components/astra/dashboard/dashboard-all';
import { DashboardTop } from 'components/astra/dashboard/dashboard-top';
import { DashboardMyNFTs } from 'components/astra/dashboard/dashboard-my-nfts';
import { DashboardHot } from 'components/astra/dashboard/dashboard-hot';
import { DashboardContextProvider } from 'utils/context/DashboardContext';

const AppRoutes = () => {
  const { allowed, ready } = useSecurityContext();

  let routes = <Route path="*" element={<></>} />;
  if (ready) {
    if (allowed) {
      routes = (
        <>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="connect" element={<ConnectPage />} />
          <Route path="sandbox" element={<SandboxPage />} />
          <Route path="dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardAll />} />
            <Route path="all" element={<DashboardAll />} />
            <Route path="top" element={<DashboardTop />} />
            <Route path="nfts" element={<DashboardMyNFTs />} />
            <Route path="hot" element={<DashboardHot />} />
          </Route>
          <Route path="*" element={<Navigate to={'/'} replace />} />
        </>
      );
    } else {
      routes = (
        <>
          <Route path="/" element={<PasswordPage />} />;
          <Route path="*" element={<Navigate to={'/'} replace />} />;
        </>
      );
    }
  }

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};

// ================================================================

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <SecurityContextProvider>
        <DashboardContextProvider>
          <AppRoutes />
        </DashboardContextProvider>
      </SecurityContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
