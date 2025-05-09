'use client';
import React from 'react';
import useHomeModule from './useHomeModule';

const HomeModule = () => {
  const {} = useHomeModule();
  return <div className="bg-red-200">HomeModule</div>;
};

export default HomeModule;
