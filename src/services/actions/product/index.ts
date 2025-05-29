'use server';
import { getProduct, getProducts, removeProduct, saveProduct } from '@/services/queries/product';
import { onCurrentUser } from '../user';
import { Product } from '@prisma/client';

export const onGetProducts = async (filters: { title: string | null; price: string | null; stock: string | null }, isActive?: boolean) => {
  await onCurrentUser();
  try {
    const products = await getProducts(filters, isActive);
    return { status: 200, data: products };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onGetProduct = async (id?: number) => {
  await onCurrentUser();
  try {
    if (!id) {
      return { status: 400, data: 'Invalid product id' };
    }
    const product = await getProduct(id);
    if (!product) {
      return { status: 404, data: 'Product not found' };
    }
    return { status: 200, data: product };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onSaveProduct = async (data: Product) => {
  await onCurrentUser();
  try {
    const saved = await saveProduct(data);
    if (saved) {
      return { status: 200, data: 'Product saved' };
    }
    return { status: 400, data: 'Error saving the product' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onRemoveProduct = async (id?: number) => {
  await onCurrentUser();
  try {
    if (!id) {
      return { status: 400, data: 'Invalid product id' };
    }
    const removed = await removeProduct(id);
    if (!removed) {
      return { status: 404, data: 'Product not found' };
    }
    return { status: 200, data: 'Product removed' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};
