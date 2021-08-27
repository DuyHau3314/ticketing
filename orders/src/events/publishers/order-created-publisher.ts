import { Subjects, OrderCreatedEvent, Publisher } from '@tdh-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}