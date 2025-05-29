/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { DataTable } from '@/components/global/datatable/DataTable';
import Loader from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDeleteProductMutation, useProductsQuery } from '@/hooks';
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import ProductInfo from '../../productinfo/ProductInof';
import { Switch } from '@/components/ui/switch';

const PorductsTable = () => {
  const { data: products, isPending } = useProductsQuery({
    price: null,
    stock: null,
    title: null,
  });
  const { mutate: removeProduct } = useDeleteProductMutation();

  const columns = [
    { header: 'Id', accessor: 'id', className: 'w-[100px]' },
    {
      header: 'Name',
      accessor: 'name',
    },
    { header: 'Description', accessor: 'description' },
    { header: 'Image Url', accessor: 'image' },
    { header: 'Price', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' },
    { header: 'Is Active', accessor: 'isActive', render: (value: boolean) => <Switch checked={value} /> },
    { header: 'Created At', accessor: 'createdAt' },
    {
      header: 'Actions',
      accessor: 'actions',
      className: 'text-right',
      render: (_value: any, row: any) => {
        return (
          <div className="flex justify-between gap-x-2">
            <Drawer direction="right">
              <DrawerTrigger className="cursor-pointer">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="cursor-pointer" variant={'outline'}>
                        <Pencil />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Product detail</DrawerTitle>
                  <DrawerDescription className="mb-10">
                    Details for <b>{row.name}.</b>
                  </DrawerDescription>
                  <div className="flex flex-col gap-3">
                    <ProductInfo id={row.id} />
                  </div>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => removeProduct(row.id)} className="cursor-pointer" variant={'destructive'}>
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove Product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {isPending ? (
        <Loader state></Loader>
      ) : (
        <>
          {products?.data && (
            <DataTable
              title="Products"
              caption="A list of your products"
              data={
                products?.data.map((pr) => {
                  return {
                    id: pr?.id,
                    name: pr?.name,
                    description: pr?.description,
                    image: pr?.image,
                    price: pr?.price,
                    stock: pr?.stock,
                    isActive: pr?.isActive,
                    createdAt: new Date(pr.createdAt).toLocaleString(),
                  };
                }) as []
              }
              columns={columns}
              footerTotal={
                <Drawer direction="right">
                  <DrawerTrigger className="cursor-pointer">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button className="cursor-pointer" variant={'default'}>
                            <CirclePlus />
                            New
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>New</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>New prduct</DrawerTitle>
                      <DrawerDescription className="mb-10">Add new product details</DrawerDescription>
                      <div className="flex flex-col gap-3">
                        <ProductInfo />
                      </div>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              }
              footerTotalLabel="Add new Product"
            />
          )}
        </>
      )}
    </div>
  );
};

export default PorductsTable;
