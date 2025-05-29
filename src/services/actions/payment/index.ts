/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import Stripe from 'stripe';
import { onCurrentUser } from '../user';
import { createPayment } from '@/services/queries/payment';
import { PaymentMethod } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET!);

export async function createCheckoutSession(product: { name: string; price: number; orderId: number }) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: product.orderId,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    });

    return { url: session.url };
  } catch (error: any) {
    console.error('Stripe checkout error:', error.message);
    return { error: error.message };
  }
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session) {
    const price = Number(session?.amount_total) / 100;
    const orderId = Number(session?.metadata?.orderId);
    if (orderId) {
      return {
        price,
        orderId,
      };
    }
    return null;
  }
  return null;
}

export const onCreatePayment = async (sessionId: string) => {
  await onCurrentUser();
  try {
    const session = await getCheckoutSession(sessionId);
    if (session) {
      const created = await createPayment(session.orderId, session.price, PaymentMethod.STRIPE);
      if (created) {
        return { status: 201, data: 'Payment created' };
      }
      return { status: 400, data: 'Something went wrong' };
    }
    return { status: 400, data: 'Something went wrong' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onCreatePaypalPayment = async (orderId: number, price: number) => {
  await onCurrentUser();
  try {
    const created = await createPayment(orderId, price, PaymentMethod.PAYPAL);
    if (created) {
      return { status: 201, data: 'Payment created' };
    }
    return { status: 400, data: 'Something went wrong' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};
