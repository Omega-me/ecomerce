import { client } from '@/common/lib';
import { Order, OrderItem } from '@prisma/client';

export const getOrderItems = async (userId?: number) => {
  const where = userId ? { userId } : undefined;

  return client.orderItem.findMany({
    where: {
      ...where,
      orderId: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      product: true,
    },
  });
};

export const attachOrderItemsToOrder = async (userId: number, orderId: number) => {
  const where = {
    ...(userId ? { userId } : {}),
    orderId: null,
  };

  return client.orderItem.updateMany({
    where,
    data: {
      orderId,
    },
  });
};

export const getOrderTotalPrice = async (userId: number) => {
  const where = {
    ...(userId ? { userId } : {}),
    orderId: null,
  };

  const orderItems = await client.orderItem.findMany({
    where,
  });
  const totalPrice = orderItems.reduce((price, item) => {
    return price + item.price * item.quantity;
  }, 0);

  return totalPrice;
};

export const getOrderItem = async (id: number) => {
  return client.orderItem.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });
};

export const createOrderItem = async (orderItem: OrderItem) => {
  return client.orderItem.create({
    data: orderItem,
  });
};

export const createOrder = async (userId: number) => {
  const totalPrice = await getOrderTotalPrice(userId);

  await client.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        total: totalPrice,
        userId,
      },
    });

    await tx.orderItem.updateMany({
      where: {
        userId,
        orderId: null,
      },
      data: {
        orderId: order.id,
      },
    });
  });
};

export const editOrder = async (order: Order) => {
  return await client.order.update({
    where: {
      id: order.id,
    },
    data: {
      ...order,
    },
  });
};

export const deleteOrderItem = async (id: number) => {
  return client.orderItem.delete({
    where: {
      id,
    },
  });
};

export const changeQuantityOrderItem = async (id: number, increment: boolean) => {
  return client.orderItem.update({
    where: {
      id,
    },
    data: {
      quantity: {
        [increment ? 'increment' : 'decrement']: 1,
      },
    },
  });
};
