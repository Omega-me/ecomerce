/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface Props {
  name: string;
  description: string | null;
  image: string;
  price: number;
  stock: number;
}

const Product = (props: Props) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <img src={props.image === '' ? 'https://placehold.co/600x400' : props.image} alt="product image" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-x-2">
          <div>{props.stock === 0 ? 'Out of stock' : `${props.stock} pieces`}</div>/<div>{`${props.price} $`}</div>
        </div>
        <Button className="cursor-pointer">
          <ShoppingCart />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
