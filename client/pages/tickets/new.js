import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  const onBur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a ticket</h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            type="number"
          />
        </div>
        <div className="mt-2">{errors}</div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
