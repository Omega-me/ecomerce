'use client';
import { useUserInfoQuery } from '@/hooks';
import React from 'react';
import Admin from './admin/Admin';
import Client from './client/Client';

const Dashboard = () => {
  const { data: user } = useUserInfoQuery();

  return user?.data?.role === 'ADMIN' ? <Admin /> : <Client />;
};

export default Dashboard;
