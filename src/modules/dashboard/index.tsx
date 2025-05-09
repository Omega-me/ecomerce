'use client';
import React from 'react';
import useDashboardModule from './useDashboardModule';

const DashboardModule = () => {
  const { user, products } = useDashboardModule();
  console.log(products);
  return <div>{JSON.stringify(user, undefined, 4)}</div>;
};

export default DashboardModule;
