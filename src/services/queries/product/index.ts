'use server';
import { client } from '@/common/lib';
import { Product } from '@prisma/client';

export const getProducts = async (filters: { title: string | null; price: string | null; stock: string | null }, isActive?: boolean) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (filters.title) {
    where.name = {
      contains: filters.title,
      mode: 'insensitive',
    };
  }

  if (filters.price) {
    where.price = Number(filters.price);
  }

  if (filters.stock) {
    where.stock = Number(filters.stock);
  }

  if (isActive) {
    where.isActive = isActive;
  }

  return await client.product.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getProduct = async (id: number) => {
  return await client.product.findUnique({
    where: {
      id,
    },
    include: {
      orderItems: true,
    },
  });
};

export const saveProduct = async (data: Product) => {
  if (data.id) {
    return await client.product.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  return await client.product.create({
    data,
  });
};

export const removeProduct = async (id: number) => {
  return await client.product.delete({
    where: {
      id,
    },
  });
};
