import { client } from '@/common/lib';

export const getOrders = async () => {
  return client.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      payment: true,
      shipment: true,
      user: true,
    },
  });
};
