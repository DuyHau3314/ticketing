import { Subjects, OrderCancelledEvent, Publisher } from '@tdh-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}