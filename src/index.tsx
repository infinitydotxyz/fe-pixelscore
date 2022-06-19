import { DashboardAll } from 'components/astra/dashboard/dashboard-all';
import { DashboardMyNFTs } from 'components/astra/dashboard/dashboard-my-nfts';
import { DashboardPending } from 'components/astra/dashboard/dashboard-pending';
import { DashboardRevealed } from 'components/astra/dashboard/dashboard-revealed';
import { DashboardTop5 } from 'components/astra/dashboard/dashboard-top5';
import 'flowbite';
import { DashboardPage } from 'pages/app';
import { ConnectPage } from 'pages/connect';
import { HomePage } from 'pages/home';
import { PaperPage } from 'pages/paper';
import { PasswordPage } from 'pages/password';
import { SandboxPage } from 'pages/sandbox';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { AppContextProvider } from 'utils/context/AppContext';
import { DashboardContextProvider } from 'utils/context/DashboardContext';
import { SecurityContextProvider, useSecurityContext } from 'utils/context/SecurityContext';
import './global.scss';
import { reportWebVitals } from './reportWebVitals';

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
          <Route path="paper" element={<PaperPage />} />
          <Route path="app" element={<DashboardPage />}>
            <Route index element={<DashboardAll />} />
            <Route path="all" element={<DashboardAll />} />
            <Route path="top5" element={<DashboardTop5 />} />
            <Route path="portfolio" element={<DashboardMyNFTs />} />
            <Route path="pending" element={<DashboardPending />} />
            <Route path="revealed" element={<DashboardRevealed />} />
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
          <div className="dark">
            <AppRoutes />
          </div>
        </DashboardContextProvider>
      </SecurityContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
