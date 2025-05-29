import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';
import PorductsTable from './products/PorductsTable';
import UsersTable from './users/UsersTable';
import OrderTable from '../ordertable/OrderTable';

const Admin = () => {
  return (
    <div className="p-10">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="products">
          <AccordionTrigger>Products</AccordionTrigger>
          <AccordionContent>
            <PorductsTable />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="orders">
          <AccordionTrigger>Orders</AccordionTrigger>
          <AccordionContent>
            <OrderTable />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="users">
          <AccordionTrigger>Users</AccordionTrigger>
          <AccordionContent>
            <UsersTable />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Admin;
