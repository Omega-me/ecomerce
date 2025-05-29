import { QueryClient, QueryFunction } from '@tanstack/react-query';
import { onGetProducts } from '../actions/product';
import { onGetOrders } from '../actions/order';
import { onUserInfo } from '../actions/user';
import { onGetOrderItems } from '../actions/orderitem';

const prefetch = async (client: QueryClient, action: QueryFunction, key: string) => {
  return await client.prefetchQuery({
    queryKey: [key],
    queryFn: action,
    staleTime: 60000,
  });
};

export const PrefetchUser = async (client: QueryClient) => {
  return await prefetch(client, onUserInfo, 'user-info');
};

export const PrefetcProducts = async (client: QueryClient) => {
  return await prefetch(
    client,
    () =>
      onGetProducts({
        price: null,
        stock: null,
        title: null,
      }),
    'products'
  );
};

export const PrefetcOrderItems = async (client: QueryClient) => {
  return await prefetch(client, () => onGetOrderItems(), 'order-items');
};

export const PrefetcAllOrders = async (client: QueryClient) => {
  return await prefetch(client, onGetOrders, 'all-orders');
};
