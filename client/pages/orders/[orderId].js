import { useEffect, useState } from 'react';
import buildClient from '../../api/build-client';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'POST',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51HTlNgDoqXyubJLREUrUwsXB1yPuWy2qxKUXN1cyU1WfD50738IMJ54nArwjMHe8idOG1V4Dfn7Qnv5IzsJsiwp100tWdxTt6z"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { orderId } = context.query;
  const client = await buildClient(context);
  const { data } = await client.get(`/api/orders/${orderId}`);

  return {
    props: {
      order: data,
    },
  };
};

export default OrderShow;
