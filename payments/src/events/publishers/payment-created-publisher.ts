import { Subjects, Publisher, PaymentCreatedEvent } from "@tdh-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
};