/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleOff, CreditCard, Truck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import useClient from '@/hooks/use-client';
import { DataTable } from '@/components/global/datatable/DataTable';
import Shipment from '../shipment/Shipment';
import PaymentInfo from '../paymentinfo/PaymentInfo';
import { useUserInfoQuery } from '@/hooks';
import Loader from '@/components/global/loader';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order, OrderStatus } from '@prisma/client';

const OrderTable = () => {
  const { data: user } = useUserInfoQuery();
  const isAdmin = user?.data && user.data.role === 'ADMIN' ? true : false;
  const { orders, cancelOrder, isPending, changeStatus } = useClient();

  const columns = [
    { header: 'Id', accessor: 'id', className: 'w-[100px]' },
    {
      header: 'Status',
      accessor: 'status',
      render: (_value: any, row: any) => {
        return user?.data && user?.data?.role === 'USER' ? (
          <p>{row.status} </p>
        ) : (
          <Select
            value={row.status}
            onValueChange={(value: OrderStatus) =>
              changeStatus({
                id: row.id,
                status: value,
              } as Order)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value={OrderStatus.CANCELLED}>{OrderStatus.CANCELLED}</SelectItem>
                <SelectItem value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</SelectItem>
                <SelectItem value={OrderStatus.PACKED}>{OrderStatus.PACKED}</SelectItem>
                <SelectItem value={OrderStatus.PENDING}>{OrderStatus.PENDING}</SelectItem>
                <SelectItem value={OrderStatus.PAID}>{OrderStatus.PAID}</SelectItem>
                <SelectItem value={OrderStatus.SHIPPED}>{OrderStatus.SHIPPED}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
    { header: 'Total', accessor: 'total', render: (_value: any, row: any) => <p>{row.total} $</p> },
    { header: 'Created At', accessor: 'createdAt' },
    {
      header: 'Actions',
      accessor: 'actions',
      className: 'text-right',
      render: (_value: any, row: any) => {
        const order = orders?.data && orders.data.find((o) => o.id === row.id);
        const hasShipment = !!order?.shipment;
        const hasPayment = !!order?.payment;
        return (
          <div className="flex justify-end gap-x-2">
            {!isAdmin && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() =>
                        cancelOrder({
                          id: row.id,
                          status: 'CANCELLED',
                        } as unknown as any)
                      }
                      disabled={row.status !== 'PENDING'}
                      className="cursor-pointer"
                      variant={'outline'}
                    >
                      <CircleOff />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cancel order</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Drawer direction="right">
              <DrawerTrigger className="cursor-pointer">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="cursor-pointer" variant={'outline'}>
                        <CreditCard color={hasPayment ? 'green' : 'red'} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Payment informations</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Payment</DrawerTitle>
                  <DrawerDescription className="mb-10">Payment details for the order {row.id}.</DrawerDescription>
                  <div className="flex flex-col gap-3">
                    <PaymentInfo isAdmin={isAdmin} orderId={row.id} />
                  </div>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>

            <Drawer direction="right">
              <DrawerTrigger className="cursor-pointer">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="cursor-pointer" variant={'outline'}>
                        <Truck color={hasShipment ? 'green' : 'red'} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Shipping address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Shipping address</DrawerTitle>
                  <DrawerDescription className="mb-10">Shipment details for the order {row.id}.</DrawerDescription>
                  <div className="flex flex-col gap-3">
                    <Shipment isAdmin={isAdmin} orderId={row.id} />
                  </div>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
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
          {orders && orders.data && (
            <DataTable
              title="Orders"
              caption="A list of your orders"
              data={
                orders.data.map((order) => {
                  return {
                    id: order.id,
                    status: order.status,
                    total: order.total,
                    createdAt: new Date(order.createdAt).toLocaleString(),
                  };
                }) as []
              }
              columns={columns}
              footerTotal={orders.data.reduce((value, order) => value + order.total, 0) + '$'}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OrderTable;
