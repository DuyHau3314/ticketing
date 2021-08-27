import { Publisher, Subjects, TicketCreatedEvent } from "@tdh-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

