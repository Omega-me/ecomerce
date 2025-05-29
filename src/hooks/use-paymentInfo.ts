import { createCheckoutSession } from '@/services/actions/payment';
import { useTransition } from 'react';
import { useOrderQuery } from './useQueries';
import { Order } from '@prisma/client';
import { useCreatePaymentMutation, useCreatePaypalPaymentMutation } from './useMutation';
import { useSearchParams } from 'next/navigation';

const usePaymentInfo = (orderId: number) => {
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { data: order, isPending: orderPending } = useOrderQuery(orderId);
  const { mutate: createPaypalPayment } = useCreatePaypalPaymentMutation(orderId);
  const { mutate: createStripePayment } = useCreatePaymentMutation();

  const handleCheckout = (opts: { name: string; price: number }) => {
    startTransition(async () => {
      const res = await createCheckoutSession({
        name: opts.name,
        price: opts.price,
        orderId,
      });

      if (res?.url) {
        window.location.href = res.url;
      } else {
        alert('Error creating checkout session: ' + res?.error);
      }
    });
  };

  const handleCreateStripePayment = () => {
    const session_id = params.get('session_id') ?? null;
    if (session_id) {
      createStripePayment(session_id);
    }
  };

  return { handleCheckout, isPending, order: order?.data as Order | undefined, orderPending, createPaypalPayment, handleCreateStripePayment };
};

export default usePaymentInfo;
