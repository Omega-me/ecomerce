/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Loader from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import useShipment from '@/hooks/use-shipment';
import { Shipment as ShipmentData, ShipmentStatus } from '@prisma/client';
import { Save } from 'lucide-react';
import React from 'react';

interface Props {
  orderId: number;
  isAdmin: boolean;
}

const Shipment = (props: Props) => {
  const { shipmentFormData, handleChangeShipment, handleSaveShipment, isPending, hasShipmentValue, shipment, handleSetStatus } = useShipment(
    props.orderId
  );
  const status = (shipment?.data as ShipmentData)?.status;
  return (
    <form
      onSubmit={(e) => {
        if (!props.isAdmin) {
          handleSaveShipment(e);
        }
      }}
    >
      <div className="flex flex-col gap-y-5 mb-8">
        <div>
          <Label className="mb-3" htmlFor="address">
            Address
          </Label>
          <Input
            disabled={props.isAdmin}
            value={shipmentFormData.address}
            type="text"
            id="address"
            name="address"
            required
            placeholder={props.isAdmin ? 'No address is set' : 'Address'}
            onChange={handleChangeShipment}
          />
        </div>
        <div>
          <Label className="mb-3" htmlFor="city">
            City
          </Label>
          <Input
            placeholder={props.isAdmin ? 'No city is set' : 'City'}
            disabled={props.isAdmin}
            value={shipmentFormData.city}
            type="text"
            id="city"
            name="city"
            required
            onChange={handleChangeShipment}
          />
        </div>
        <div>
          <Label className="mb-3" htmlFor="zipCode">
            Zip Code
          </Label>
          <Input
            placeholder={props.isAdmin ? 'No zip code is set' : 'Zip Code'}
            disabled={props.isAdmin}
            value={shipmentFormData.zipCode}
            type="text"
            id="zipCode"
            name="zipCode"
            required
            onChange={handleChangeShipment}
          />
        </div>
        <div>
          <Label className="mb-3" htmlFor="shipped">
            Shipped At
          </Label>
          <Input disabled value={(shipment?.data as any)?.shippedAt} />
        </div>
        <div>
          <Label className="mb-3" htmlFor="delivered">
            Delivered At
          </Label>
          <Input disabled value={(shipment?.data as any)?.deliveredAt} />
        </div>
        <div>
          <Label className="mb-3" htmlFor="status">
            Status
          </Label>
          <Select disabled={!props.isAdmin} value={status} onValueChange={(value: ShipmentStatus) => handleSetStatus(value)}>
            <SelectTrigger id="status" className="w-full mt-5 cursor-point">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value={ShipmentStatus.DELIVERED}>{ShipmentStatus.DELIVERED}</SelectItem>
                <SelectItem value={ShipmentStatus.IN_TRANSIT}>{ShipmentStatus.IN_TRANSIT}</SelectItem>
                <SelectItem value={ShipmentStatus.PENDING}>{ShipmentStatus.PENDING}</SelectItem>
                <SelectItem value={ShipmentStatus.RETURNED}>{ShipmentStatus.RETURNED}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full">
        {!props.isAdmin && (
          <Button disabled={!hasShipmentValue} className="w-full cursor-pointer" type="submit">
            <Loader state={isPending}>
              <Save />
            </Loader>
            Save Address
          </Button>
        )}
      </div>
    </form>
  );
};

export default Shipment;
