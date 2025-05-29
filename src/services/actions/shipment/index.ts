'use server';
import { onCurrentUser } from '@/services/actions/user';
import { createShipment, getShipment, updateShipment } from '@/services/queries/shipment';
import { Shipment } from '@prisma/client';

export const onGetShipment = async (orderId: number) => {
  await onCurrentUser();
  try {
    const shipment = await getShipment(orderId);
    if (!shipment) {
      return { status: 404, data: 'Shipment not found' };
    }
    return { status: 200, data: shipment };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onSaveShipment = async (data: Shipment, orderId: number) => {
  await onCurrentUser();
  try {
    const shipment = await getShipment(orderId);
    if (!shipment) {
      await createShipment(data);
      return { status: 201, data: 'Shipment saved' };
    }
    await updateShipment({ ...data, id: shipment.id });
    return { status: 200, data: 'Shipment saved' };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};
