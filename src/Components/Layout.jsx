import React from 'react';
import { Outlet } from 'react-router-dom';
import ConnectivityIndicator from './ConnectivityIndicator';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <ConnectivityIndicator />
      <Header />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
