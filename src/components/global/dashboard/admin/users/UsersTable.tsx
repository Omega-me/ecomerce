'use client';
import { DataTable } from '@/components/global/datatable/DataTable';
import Loader from '@/components/global/loader';
import { useUsersQuery } from '@/hooks';
import React from 'react';

const UsersTable = () => {
  const { data: users, isPending } = useUsersQuery();
  const columns = [
    { header: 'Id', accessor: 'id', className: 'w-[100px]' },
    {
      header: 'First Name',
      accessor: 'firstName',
    },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Role', accessor: 'role' },
    { header: 'Created At', accessor: 'createdAt' },

    { header: 'Total orders', accessor: 'totalOrders', className: 'text-right' },
  ];
  return (
    <div>
      {isPending ? (
        <Loader state></Loader>
      ) : (
        <>
          {users?.data && (
            <DataTable
              title="Users"
              caption="A list of your users"
              data={
                users.data.map((user) => {
                  return {
                    id: user?.id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    role: user?.role,
                    createdAt: new Date(user.createdAt).toLocaleString(),
                    totalOrders: user?.orders?.length + ' orders total' + ' ' + user?.orders.reduce((value, order) => value + order?.total, 0) + '$',
                  };
                }) as []
              }
              columns={columns}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UsersTable;
