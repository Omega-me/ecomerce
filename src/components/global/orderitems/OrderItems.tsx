'use client';
import { useOrderItemsQuery, useUserInfoQuery } from '@/hooks';
import React from 'react';
import { ItemCard } from './itemcard/ItemCard';

const OrderItems = () => {
  const { data: user } = useUserInfoQuery();
  const { data: items } = useOrderItemsQuery(user?.data?.id);

  return (
    <div className="overflow-hidden overflow-y-auto h-[70vh] flex flex-col gap-2">
      {items?.data?.map((item) => (
        <div key={item.id}>
          <ItemCard orderItem={item} />
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
