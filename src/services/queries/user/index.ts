import { client } from '@/common/lib';

export const findUser = async (clerkId: string) => {
  return await client.user.findUnique({
    where: { clerkId },
    include: {
      orders: {
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
        },
      },
    },
  });
};

export const getUsers = async () => {
  return await client.user.findMany({
    include: {
      orders: true,
    },
  });
};

export const createUser = async (user: { clerkId: string; firstName: string; lastName: string }) => {
  return await client.user.create({
    data: user,
  });
};
