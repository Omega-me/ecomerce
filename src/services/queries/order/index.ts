import { client } from '@/common/lib';

export const getOrders = async (userId?: number) => {
  return client.order.findMany({
    where: {
      userId,
    },
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

export const getOrder = async (id: number) => {
  return client.order.findUnique({
    where: {
      id,
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
