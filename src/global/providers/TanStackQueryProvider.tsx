'use client';
import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends PropsWithChildren {}

const client = new QueryClient();
const TanStackQueryProvider: React.FC<Props> = props => {
  return (
    <QueryClientProvider client={client}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStackQueryProvider;
