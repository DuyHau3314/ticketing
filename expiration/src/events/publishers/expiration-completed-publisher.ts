import { Subjects, Publisher, ExpirationCompletedEvent } from "@tdh-tickets/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
    subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
}