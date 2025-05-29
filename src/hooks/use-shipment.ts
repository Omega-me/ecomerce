/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useShipmentMutation } from './useMutation';
import { Shipment, ShipmentStatus } from '@prisma/client';
import { useShipmentQuery } from './useQueries';

const useShipment = (orderId: number) => {
  const { data: shipment } = useShipmentQuery(orderId);
  const { mutate: saveShipment, isPending } = useShipmentMutation(orderId);

  const [shipmentFormData, setShipmentFormData] = useState({
    address: '',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    if (shipment && shipment.data) {
      setShipmentFormData({
        address: (shipment?.data as any)?.address ?? '',
        city: (shipment?.data as any)?.city ?? '',
        zipCode: (shipment?.data as any)?.zipCode ?? '',
      });
    }
  }, [shipment]);

  const handleChangeShipment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipmentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveShipment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...shipmentFormData,
      orderId,
    };

    saveShipment(payload as Shipment);
  };

  const handleSetStatus = (status: ShipmentStatus) => {
    const payload: {
      status: ShipmentStatus;
      orderId: number;
      shippedAt?: Date;
      deliveredAt?: Date;
    } = {
      status,
      orderId,
    };
    if (status === 'IN_TRANSIT') {
      payload.shippedAt = new Date();
      payload.deliveredAt = undefined;
    }
    if (status === 'DELIVERED') {
      payload.deliveredAt = new Date();
      payload.shippedAt = undefined;
    }

    saveShipment(payload as Shipment);
  };

  const hasShipmentValue = Object.values(shipmentFormData).some((value) => value.trim() !== '');

  return {
    shipmentFormData,
    handleChangeShipment,
    handleSaveShipment,
    isPending,
    shipment,
    hasShipmentValue,
    handleSetStatus,
  };
};

export default useShipment;
