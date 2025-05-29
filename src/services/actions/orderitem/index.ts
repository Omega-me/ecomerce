'use server';
import {
  changeQuantityOrderItem,
  createOrder,
  createOrderItem,
  deleteOrderItem,
  editOrder,
  getOrderItem,
  getOrderItems,
} from '@/services/queries/orederitem';
import { onCurrentUser, onUserInfo } from '../user';
import { Order, OrderItem } from '@prisma/client';

export const onGetOrderItems = async (userId?: number) => {
  await onCurrentUser();
  try {
    const orderItems = await getOrderItems(userId);
    return { status: 200, data: orderItems };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onGetOrderItem = async (id: number) => {
  await onCurrentUser();
  try {
    const orderItem = await getOrderItem(id);
    if (!orderItem) {
      return { status: 404, data: 'Not found' };
    }
    return { status: 200, data: orderItem };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onCreateOrderItem = async (orderItem: OrderItem) => {
  await onCurrentUser();
  try {
    await createOrderItem(orderItem);
    return { status: 201, data: 'Product added to cart' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onCreateOrder = async () => {
  await onCurrentUser();
  try {
    const user = await onUserInfo();
    if (user && user.data) {
      const userId = user.data.id;
      await createOrder(userId);
      return { status: 200, data: 'Order created' };
    }
    return { status: 200, data: 'Failed to create order' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onEditOrder = async (order: Order) => {
  await onCurrentUser();
  try {
    const edited = await editOrder(order);
    if (!edited) {
      return { status: 404, data: 'Order does not exists' };
    }

    return { status: 200, data: 'Order saved' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onDeleteOrderItem = async (id: number) => {
  await onCurrentUser();
  try {
    const deleted = await deleteOrderItem(id);
    if (!deleted) {
      return { status: 404, data: 'Not found' };
    }
    return { status: 201, data: 'Order item removed' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onChangeQuantityOrderItem = async (id: number, increment: boolean) => {
  await onCurrentUser();
  try {
    const changed = await changeQuantityOrderItem(id, increment);
    if (!changed) {
      return { status: 404, data: 'Not found' };
    }
    return { status: 200, data: 'Quantity changed' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};
