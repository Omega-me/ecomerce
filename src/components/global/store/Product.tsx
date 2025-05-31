/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useOrderItemMutation, useUserInfoQuery } from "@/hooks";
import { OrderItem, Product as ProductProps } from "@prisma/client";
import Loader from "../loader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  product: ProductProps;
}

const Product = (props: Props) => {
  const { isSignedIn } = useUser();
  const { data: user } = useUserInfoQuery();
  const { mutate: addToCart, isPending } = useOrderItemMutation();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{props.product.name}</CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <CardDescription>
              <div className="truncate w-[300px] cursor-pointer">
                {props.product.description}
              </div>
            </CardDescription>
          </TooltipTrigger>
          <TooltipContent>
            <div className="w-[350px] text-[14px] cursor-pointer">
              <p>{props.product.description}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent>
        <div>
          <img
            src={
              !props?.product?.image || props?.product?.image.trim() === ""
                ? "https://placehold.co/600x400/EFE6DD/7A7A7A/png?text=Skincare+Produc"
                : (props.product?.image as string)
            }
            alt="product image"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-x-2">
          <div>
            {props.product.stock === 0
              ? "Out of stock"
              : `${props.product.stock} pieces`}
          </div>
          /<div>{`${props.product.price.toFixed(2)} $`}</div>
        </div>
        {isSignedIn ? (
          <Button
            onClick={() =>
              addToCart({
                productId: props.product.id,
                price: Number(props.product.price.toFixed(2)),
                quantity: 1,
                userId: user?.data?.id,
              } as OrderItem)
            }
            className="cursor-pointer"
          >
            <Loader state={isPending}>
              <ShoppingCart />
            </Loader>
            Add
          </Button>
        ) : (
          <Button disabled className="cursor-pointer">
            <ShoppingCart />
            Login to buy
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Product;
