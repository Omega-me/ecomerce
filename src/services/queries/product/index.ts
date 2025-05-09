import { client } from '@/common/lib';

export const getProducts = async () => {
  return await client.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};
