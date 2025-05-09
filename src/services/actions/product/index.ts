'use server';
import { getProducts } from '@/services/queries/product';

export const onGetProducts = async () => {
  try {
    const products = await getProducts();
    return { status: 200, data: products };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};
