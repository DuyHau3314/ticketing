import { Subjects } from './subjects';
import { TicketCreatedEvent } from './ticket-created-event';
import { Listener } from '../events/base-listener';
import { Message } from 'node-nats-streaming';


class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payment-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);
        msg.ack();
    }
}

export { TicketCreatedListener };