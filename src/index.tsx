import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from 'utils/context/AppContext';
import { ConnectPage } from 'pages/connect';
import { PixelScore } from 'pages/home';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PixelScore />} />
          <Route path="connect" element={<ConnectPage />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
