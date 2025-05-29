/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '../../loader';
import { CircleMinus, CirclePlus, Trash2 } from 'lucide-react';
import { useChangeQuantityMutation, useRemoveOrderItemMutation } from '@/hooks';

interface Props {
  orderItem: {
    product: {
      name: string;
      id: number;
      price: number;
      image: string | null;
      description: string | null;
      stock: number;
      isActive: boolean;
      createdAt: Date;
    };
  } & {
    id: number;
    price: number;
    userId: number;
    orderId: number | null;
    productId: number;
    quantity: number;
  };
}

export const ItemCard = (props: Props) => {
  const item = props.orderItem;
  const { mutate: remove, isPending } = useRemoveOrderItemMutation();
  const { mutate } = useChangeQuantityMutation();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{item.product.name}</CardTitle>
        <CardDescription>{item.product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="w-3/4 mb-5">
            <img
              src={
                !item.product.image || item.product.image.trim() === ''
                  ? 'https://placehold.co/600x400/EFE6DD/7A7A7A/png?text=Skincare+Produc'
                  : (item.product.image as string)
              }
              alt="product image"
            />
          </div>
          <div>
            <b>Total</b> {item.price * item.quantity}$ <br /> <b>Per product</b> {item.product.price}$
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex justify-between items-center gap-x-3">
          <Button
            disabled={item.quantity <= 1}
            onClick={() => mutate({ id: item.id, increment: false })}
            variant={'ghost'}
            className="cursor-pointer"
          >
            <CircleMinus />
          </Button>
          {item.quantity}
          <Button onClick={() => mutate({ id: item.id, increment: true })} variant={'ghost'} className="cursor-pointer">
            <CirclePlus />
          </Button>
        </div>
        <Button onClick={() => remove(item.id)} className="cursor-pointer" variant="outline">
          <Loader state={isPending}>
            <Trash2 />
          </Loader>
        </Button>
      </CardFooter>
    </Card>
  );
};
