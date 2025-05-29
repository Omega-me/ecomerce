'use server';
import { client } from '@/common/lib';
import { Shipment } from '@prisma/client';

export const getShipment = async (orderId: number) => {
  return await client.shipment.findFirst({
    where: {
      orderId,
    },
  });
};

export const createShipment = async (data: Shipment) => {
  return await client.shipment.create({
    data: {
      ...data,
    },
  });
};
export const updateShipment = async (data: { id?: number; orderId: number; address: string; city: string; zipCode: string }) => {
  const { id, ...updateData } = data;

  return await client.shipment.update({
    where: {
      id,
    },
    data: updateData,
  });
};
