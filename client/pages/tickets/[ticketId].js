import buildClient from '../../api/build-client';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'POST',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => Router.push(`/orders/${order.id}`),
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={() => doRequest({})} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { ticketId } = context.query;
  const client = buildClient(context);

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return {
    props: {
      ticket: data,
    },
  };
};

export default TicketShow;
