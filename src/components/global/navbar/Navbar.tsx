'use client';
import * as React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { usePaths } from '@/hooks/use-paths';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { cn } from '@/common/lib';
import { Input } from '@/components/ui/input';
import { FunnelPlus, Search, ShoppingCart } from 'lucide-react';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { handleIsActiveRoute } = usePaths();
  return (
    <NavigationMenu className="w-full p-2.5 shadow-2xl sticky top-0 mb-5">
      <NavigationMenuList className="flex w-[100vw] items-center justify-between">
        <div className="flex items-center ml-4 gap-x-2">
          <NavigationMenuItem className="">
            <Link href="/" passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), handleIsActiveRoute('/'))}>Store</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SignedIn>
              <Link href="/dashboard" passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), handleIsActiveRoute('/dashboard'))}>Dashboard</NavigationMenuLink>
              </Link>
            </SignedIn>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SignedOut>
              <Link href={'/sign-in'}>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), handleIsActiveRoute('/sign-in'))}>Login</NavigationMenuLink>
              </Link>
            </SignedOut>
          </NavigationMenuItem>
        </div>

        <div className="flex justify-between items-center gap-x-3">
          <div className="flex justify-between items-center border-2 gap-x-2 px-2 cursor-pointer rounded-2xl">
            <Drawer direction="right">
              <DrawerTrigger className="cursor-pointer">
                <FunnelPlus size={16} color="grey" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerDescription>Filter your products.</DrawerDescription>
                  <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. A provident est assumenda molestias ipsum porro eveniet tempora
                    necessitatibus autem? Eaque iure commodi dicta, impedit quis provident. Soluta ducimus vel quam!
                  </div>
                </DrawerHeader>
                <DrawerFooter>
                  <Button className="gap-x-2 cursor-pointer">
                    <Search />
                    Search
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Input className="flex-1 border-0 ring-0" placeholder="Search..." />
          </div>
          <div className="flex items-center justify-between">
            <Drawer direction="right">
              <DrawerTrigger>
                <Button className="cursor-pointer">
                  <ShoppingCart size={16} />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Order</DrawerTitle>
                  <DrawerDescription>Products in cart</DrawerDescription>
                  <div>ordered items</div>
                </DrawerHeader>
                <DrawerFooter>
                  <Button className="gap-x-2 cursor-pointer">
                    <ShoppingCart />
                    Proceed to checkout
                  </Button>
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
