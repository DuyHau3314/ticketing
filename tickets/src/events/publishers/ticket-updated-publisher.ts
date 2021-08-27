import { Publisher, Subjects, TicketUpdatedEvent } from "@tdh-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

