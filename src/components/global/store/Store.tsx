'use client';
import React from 'react';
import Product from './Product';
import { useProductsQuery } from '@/hooks';
import Loader from '../loader';
import useFilters from '@/hooks/use-filters';

const Store = () => {
  const { filters } = useFilters();
  const { data: products, isLoading } = useProductsQuery(filters, true);

  return (
    <div className="flex items-center justify-around gap-5 flex-wrap">
      <Loader state={isLoading}>
        {products?.data?.map((product) => (
          <div key={product?.id}>
            <Product product={product} />
          </div>
        ))}
      </Loader>
    </div>
  );
};

export default Store;
