'use client';
import { onGetOrder, onGetOrders } from '@/services/actions/order';
import { onGetOrderItem, onGetOrderItems } from '@/services/actions/orderitem';
import { onGetProduct, onGetProducts } from '@/services/actions/product';
import { onGetShipment } from '@/services/actions/shipment';
import { onGetUsers, onUserInfo } from '@/services/actions/user';
import { useQuery } from '@tanstack/react-query';

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: () => onUserInfo(),
  });
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => onGetUsers(),
  });
};

export const useProductsQuery = (filters: { title: string | null; price: string | null; stock: string | null }, isActive?: boolean) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => onGetProducts(filters, isActive),
  });
};

export const useProductQuery = (id?: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => onGetProduct(id),
    enabled: Boolean(id),
  });
};

export const useOrderItemsQuery = (userId?: number) => {
  return useQuery({
    queryKey: ['order-items'],
    queryFn: () => onGetOrderItems(userId),
  });
};

export const useOrderItemQuery = (id: number) => {
  return useQuery({
    queryKey: ['order-item'],
    queryFn: () => onGetOrderItem(id),
  });
};

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: onGetOrders,
  });
};

export const useOrderQuery = (orderId: number) => {
  return useQuery({
    queryKey: ['order'],
    queryFn: () => onGetOrder(orderId),
  });
};

export const useShipmentQuery = (orderId: number) => {
  return useQuery({
    queryKey: ['shipment', orderId],
    queryFn: () => onGetShipment(orderId),
    enabled: !!orderId,
  });
};
