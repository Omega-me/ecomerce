'use client';
import React from 'react';
import Product from './Product';
import { useProductsQuery } from '@/hooks';
import Loader from '../loader';

const Store = () => {
  const { data: products, isLoading } = useProductsQuery();

  return (
    <div className="flex items-center justify-around gap-5 flex-wrap">
      <Loader state={isLoading}>
        {products?.data?.map((product) => (
          <div key={product?.id}>
            <Product image={product.image} description={product?.description} name={product.name} price={product.price} stock={product.stock} />
          </div>
        ))}
      </Loader>
    </div>
  );
};

export default Store;
