import { Order, OrderItem, Product, Shipment } from '@prisma/client';
import { useMutationData } from './useMutationData';
import { onChangeQuantityOrderItem, onCreateOrder, onCreateOrderItem, onDeleteOrderItem, onEditOrder } from '@/services/actions/orderitem';
import { onSaveShipment } from '@/services/actions/shipment';
import { removeProduct } from '@/services/queries/product';
import { onSaveProduct } from '@/services/actions/product';
import { onCreatePayment, onCreatePaypalPayment } from '@/services/actions/payment';
import { useRouter } from 'next/navigation';

export const useOrderMutation = () => {
  const router = useRouter();
  const { mutate, isPending, variables } = useMutationData(['create-order'], onCreateOrder, ['order-items'], () => router.push('/dashboard'));
  return { mutate, isPending, variables };
};

export const useEditMutation = () => {
  const router = useRouter();
  const { mutate, isPending, variables } = useMutationData(
    ['edit-order'],
    (data: Order) => onEditOrder(data),
    ['orders'],
    () => router.push('/dashboard')
  );
  return { mutate, isPending, variables };
};

export const useOrderItemMutation = () => {
  const { mutate, isPending, variables } = useMutationData(
    ['create-order-item'],
    async (data: OrderItem) => {
      return await onCreateOrderItem(data);
    },
    ['order-items']
  );

  return { mutate, isPending, variables };
};

export const useChangeQuantityMutation = () => {
  const { mutate, isPending, variables } = useMutationData(
    ['change-quantity-order-item'],
    async (data: { id: number; increment: boolean }) => {
      return await onChangeQuantityOrderItem(data.id, data.increment);
    },
    ['order-items']
  );

  return { mutate, isPending, variables };
};

export const useRemoveOrderItemMutation = () => {
  const { mutate, isPending, variables } = useMutationData(
    ['remove-order-item'],
    async (id: number) => {
      return await onDeleteOrderItem(id);
    },
    ['order-items']
  );

  return { mutate, isPending, variables };
};

export const useShipmentMutation = (orderId: number) => {
  const router = useRouter();
  const { mutate, isPending, variables } = useMutationData(
    ['save-shipment'],
    async (data: Shipment) => {
      return await onSaveShipment(data, orderId);
    },
    ['orders'],
    () => router.push('/dashboard')
  );

  return { mutate, isPending, variables };
};

export const useProductMutation = () => {
  const router = useRouter();
  const { mutate, isPending, variables } = useMutationData(
    ['save-product'],
    async (data: Product) => {
      return await onSaveProduct(data);
    },
    ['products'],
    () => router.push('/dashboard')
  );

  return { mutate, isPending, variables };
};

export const useDeleteProductMutation = () => {
  const { mutate, isPending, variables } = useMutationData(
    ['remove-product'],
    async (id: number) => {
      return await removeProduct(id);
    },
    ['products']
  );

  return { mutate, isPending, variables };
};

export const useCreatePaymentMutation = () => {
  const router = useRouter();
  const { mutate, isPending, variables } = useMutationData(
    ['create-payment'],
    async (sessionId: string) => {
      return await onCreatePayment(sessionId);
    },
    ['orders'],
    () => router.push('/dashboard')
  );

  return { mutate, isPending, variables };
};

export const useCreatePaypalPaymentMutation = (orderId: number) => {
  const { mutate, isPending, variables } = useMutationData(
    ['create-payment'],
    async (price: number) => {
      return await onCreatePaypalPayment(orderId, price);
    },
    ['orders']
  );

  return { mutate, isPending, variables };
};
