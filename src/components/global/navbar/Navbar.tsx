"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/common/lib";
import { Input } from "@/components/ui/input";
import { BrushCleaning, FunnelPlus, Search, ShoppingCart } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import OrderItems from "../orderitems/OrderItems";
import { useOrderItemsQuery, useOrderMutation } from "@/hooks";
import Loader from "../loader";
import { Label } from "@/components/ui/label";
import useFilters from "@/hooks/use-filters";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { usePaths } from "@/hooks/use-paths";

export const Navbar = () => {
  const { handleIsActiveRoute } = usePaths();
  const { isSignedIn } = useUser();
  const { mutate: createOrder, isPending } = useOrderMutation();
  const { data: orderItems } = useOrderItemsQuery();
  const totalPrice = orderItems?.data?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const orderItemsCount = orderItems?.data?.length;
  const {
    formData,
    handleChange,
    handlePushFilter,
    hasActiveFilters,
    handleClearFilters,
  } = useFilters();
  const [openFilter, setOpenFilter] = useState(false);

  const renderOrderItemsCount = () => {
    return isSignedIn && orderItemsCount !== 0 ? (
      <Badge variant={"secondary"}>{orderItemsCount}</Badge>
    ) : null;
  };

  return (
    <NavigationMenu className="w-full p-2.5 sheadow-2xl sticky top-0 mb-5">
      <NavigationMenuList className="flex w-[100vw] items-center justify-between">
        <div className="flex items-center ml-4 gap-x-2">
          <div>
            <p className="bg-gradient-to-r from-green-600 to-blue-900 bg-clip-text text-transparent font-extrabold text-2xl lg:text-3xl ">
              OpalSkin
            </p>
          </div>
          <NavigationMenuItem className="">
            <Link href="/" passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  handleIsActiveRoute("/")
                )}
              >
                Store
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SignedIn>
              <Link href="/dashboard" passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    handleIsActiveRoute("/dashboard")
                  )}
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </SignedIn>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SignedOut>
              <Link href={"/sign-in"}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    handleIsActiveRoute("/sign-in")
                  )}
                >
                  Login
                </NavigationMenuLink>
              </Link>
            </SignedOut>
          </NavigationMenuItem>
        </div>

        <div className="flex justify-between items-center gap-x-3">
          <div className="flex justify-between items-center border-2 gap-x-2 px-2 cursor-pointer rounded-2xl">
            <Drawer open={openFilter} direction="right">
              <DrawerTrigger className="cursor-pointer">
                <FunnelPlus
                  onClick={() => setOpenFilter(true)}
                  size={16}
                  color="grey"
                />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerDescription className="mb-10">
                    Filter your products.
                  </DrawerDescription>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="price">Filter by price ($)</Label>
                      <Input
                        value={formData.price}
                        id="price"
                        onChange={handleChange}
                        type="number"
                        name="price"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="nr_stock">
                        Filter by number of stock
                      </Label>
                      <Input
                        value={formData.stock}
                        id="nr_stock"
                        onChange={handleChange}
                        type="number"
                        name="stock"
                      />
                    </div>
                  </div>
                </DrawerHeader>
                <DrawerFooter>
                  <Button
                    onClick={() => {
                      handlePushFilter();
                      setOpenFilter(false);
                    }}
                    className="gap-x-2 cursor-pointer"
                  >
                    <Search />
                    Search
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Input
              className="flex-1 border-0 ring-0"
              placeholder="Search..."
              value={formData.title}
              onChange={handleChange}
              name="title"
              onBlur={handlePushFilter}
            />
            {hasActiveFilters && (
              <BrushCleaning
                onClick={handleClearFilters}
                size={16}
                color="grey"
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <Drawer direction="right">
              <DrawerTrigger>
                <Button className="cursor-pointer">
                  <ShoppingCart size={16} />
                  {renderOrderItemsCount()}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="mb-5">
                  <DrawerTitle>Cart</DrawerTitle>
                  <DrawerDescription>
                    {orderItems?.data?.length} Products in cart,
                    <br />
                    To pay ${totalPrice?.toFixed(2)}
                  </DrawerDescription>
                  <OrderItems />
                </DrawerHeader>
                <DrawerFooter>
                  {isSignedIn ? (
                    <Button
                      disabled={!Boolean(orderItemsCount)}
                      onClick={() => {
                        createOrder();
                      }}
                      className="gap-x-2 cursor-pointer"
                    >
                      <Loader state={isPending}>
                        <ShoppingCart />
                      </Loader>
                      Place order
                    </Button>
                  ) : (
                    <Button disabled className="gap-x-2 cursor-pointer">
                      <ShoppingCart />
                      Login to buy
                    </Button>
                  )}
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <NavigationMenuItem className="m-3">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </NavigationMenuItem>
          </div>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
