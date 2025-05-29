/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import usePaymentInfo from '@/hooks/use-paymentInfo';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    paypal: any;
  }
}

interface PayPalButtonProps {
  amount: string;
  orderId: number;
  hide: boolean;
}

export default function PayPalButton({ amount, orderId, hide }: PayPalButtonProps) {
  const { createPaypalPayment } = usePaymentInfo(orderId);
  const paypalRef = useRef<HTMLDivElement>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    if (!window.paypal || isRendered.current) return;
    isRendered.current = true;

    window.paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const details = await actions.order.capture();
          if (details) {
            createPaypalPayment(Number(amount));
          }
        },
        onError: (err: any) => {
          console.error('PayPal Checkout error:', err);
        },
      })
      .render(paypalRef.current);
  }, [amount, createPaypalPayment]);

  return (
    !hide && (
      <div>
        <div ref={paypalRef}></div>
      </div>
    )
  );
}
