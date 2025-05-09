import React, { PropsWithChildren } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { PrefetcAllOrders, PrefetchUser } from '@/services/prefetch';
import { onBoardUser } from '@/services/actions/user';
import { redirect } from 'next/navigation';

type Props = PropsWithChildren;

const Layout = async (props: Props) => {
  // on-board user
  const user = await onBoardUser();
  if (user.status === 500) return redirect('/sign-in');

  // prefetch data
  const client = new QueryClient();
  await PrefetchUser(client);
  if (user.data?.role === 'ADMIN') {
    await PrefetcAllOrders(client);
  }

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="p-3">
        <div>{props.children}</div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
