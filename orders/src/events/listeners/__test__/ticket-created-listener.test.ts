import mongoose from 'mongoose';
import { TicketCreatedEvent } from "@tdh-tickets/common";
import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    //create an instance of the listener
    const listener = new TicketCreatedListener(natsWrapper.client);
    //create a face data event
    const data: TicketCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString(),
    };

    //create a face message object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg };
};

it('creates and saves a ticket', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});

it('ack the message', async () => {
    const { data, listener, msg } = await setup();

    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});