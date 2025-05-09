'use server';
import { getOrders } from '@/services/queries/order';
import { onCurrentUser } from '../user';

export const onGetOrders = async () => {
  await onCurrentUser();
  try {
    const orders = await getOrders();
    return { status: 200, data: orders };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onGetOrder = async () => {
  await onCurrentUser();
  try {
    const orders = await getOrders();
    return { status: 200, data: orders };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};
