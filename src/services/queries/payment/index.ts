'use server';

import { client } from '@/common/lib';
import { PaymentMethod } from '@prisma/client';

export const createPayment = async (orderId: number, price: number, method: PaymentMethod) => {
  return await client.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: 'PAID',
      payment: {
        create: {
          amount: price,
          status: 'COMPLETED',
          method,
        },
      },
    },
  });
};
