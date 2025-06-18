// LayoutRoute.js
import React from 'react';
import MainLayout from '../layouts/MainLayout'
import { Outlet } from 'react-router-dom';

const LayoutRoute = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default LayoutRoute;
