import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import usePaymentInfo from "@/hooks/use-paymentInfo";
import { OrderItem, Payment, Shipment, User } from "@prisma/client";
import { CreditCard } from "lucide-react";
import React from "react";
import PayPalButton from "../../paypalbutton/PaypalButton";

interface Props {
  orderId: number;
  isAdmin: boolean;
}

const PaymentInfo = (props: Props) => {
  const { handleCheckout, isPending, order, orderPending } = usePaymentInfo(
    props.orderId
  );
  const payment = (order as unknown as { payment: Payment })?.payment;
  const shippingAddress = (order as unknown as { shipment: Shipment | null })
    ?.shipment;
  const items = (order as unknown as { orderItems: OrderItem[] })?.orderItems;
  const user = (order as unknown as { user: User })?.user;

  const renderPaymentInfoAlert = () => {
    return !payment ? (
      <h1 className="text-red-500">No payment</h1>
    ) : (
      <h1 className="text-green-500">Paid</h1>
    );
  };

  const renderShipmentInfoAlert = () => {
    return !shippingAddress ? (
      <h1 className="text-red-500">No shipping address set</h1>
    ) : (
      <h1 className="text-green-500">Shipping address has been set</h1>
    );
  };

  return (
    <Loader state={orderPending}>
      <div className="overflow-hidden overflow-y-auto h-[70vh] flex flex-col gap-2">
        {renderPaymentInfoAlert()}
        {renderShipmentInfoAlert()}
        <div>
          <h2>Order details:</h2>
          <hr className="mb-5" />
          <div className="flex">
            <p>Id:</p>
            <b>{order?.id}</b>
          </div>
          <div className="flex">
            <p>Created date:</p>
            <b>{order?.createdAt?.toDateString()}</b>
          </div>
          <div className="flex">
            <p>Status:</p>
            <b>{order?.status}</b>
          </div>
          <div className="flex">
            <p>Total amount:</p>
            <b>{order?.total.toFixed(2)}$</b>
          </div>
          <div>
            <hr />
            <p>Items:</p>
            <div className="mb-5"></div>
            {items?.map((item) => (
              <div className="ml-10" key={item.id}>
                <hr />
                <div className="flex">
                  <p>Id:</p>
                  <b>{item.id}</b>
                </div>
                <div className="flex">
                  <p>Price:</p>
                  <b>{item.price.toFixed(2)}$</b>
                </div>
                <div className="flex">
                  <p>Quantity:</p>
                  <b>{item.quantity}</b>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          {payment !== null && (
            <div>
              <h2>Payment details</h2>
              <hr />
              <div className="mt-5"></div>
              <div className="flex">
                <p>Payment Id:</p>
                <b>{payment?.id}</b>
              </div>
              <div className="flex">
                <p>Payment date:</p>
                <b>{payment?.createdAt.toDateString()}</b>
              </div>
              <div className="flex">
                <p>Amount paid:</p>
                <b>{payment?.amount.toFixed(2)}$</b>
              </div>
              <div className="flex">
                <p>Payment methode:</p>
                <b>{payment?.method}</b>
              </div>
            </div>
          )}
        </div>

        {props.isAdmin ? (
          <div className="mt-5">
            <h2>User information:</h2>
            <hr className="mb-5" />
            <div className="flex">
              <p>Id:</p>
              <b>{user?.id}</b>
            </div>
            <div className="flex">
              <p>Username: </p>
              <b>
                {user?.firstName} {user?.lastName}
              </b>
            </div>
          </div>
        ) : (
          <>
            <Button
              onClick={() =>
                handleCheckout({
                  name: `Order ${order?.id}`,
                  price: Number(order?.total.toFixed(2)),
                })
              }
              className="w-full mt-5 cursor-pointer"
              disabled={
                (shippingAddress === null || order?.status) !== "PENDING"
              }
            >
              {order?.status === "PENDING" && (
                <Loader state={isPending}>
                  <CreditCard />
                </Loader>
              )}
              {shippingAddress === null
                ? "Missing shipping address"
                : order?.status === "PENDING"
                ? "Pay"
                : `Order is ${order?.status}`}
            </Button>
            <PayPalButton
              hide={(shippingAddress === null || order?.status) !== "PENDING"}
              orderId={order?.id as number}
              amount={(order?.total as number)?.toFixed(2)}
            />
          </>
        )}
      </div>
    </Loader>
  );
};

export default PaymentInfo;
