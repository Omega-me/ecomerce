'use server';
import { getOrder, getOrders } from '@/services/queries/order';
import { onCurrentUser, onUserInfo } from '../user';

export const onGetOrders = async () => {
  await onCurrentUser();
  try {
    const user = await onUserInfo();
    if (user) {
      const orders = await getOrders(user.data?.role === 'USER' ? user.data?.id : undefined);
      return { status: 200, data: orders };
    }
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onGetOrder = async (orderId: number) => {
  await onCurrentUser();
  try {
    const order = await getOrder(orderId);
    if (!order) {
      return { status: 404, data: 'Order not found' };
    }
    return { status: 200, data: order };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};
