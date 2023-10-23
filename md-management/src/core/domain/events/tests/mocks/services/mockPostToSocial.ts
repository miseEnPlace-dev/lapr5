import { DomainEvents } from '../../../DomainEvents';
import { IHandle } from '../../../IHandle';
import { MockJobCreatedEvent } from '../events/mockJobCreatedEvent';
import { MockJobDeletedEvent } from '../events/mockJobDeletedEvent';

export class MockPostToSocial implements IHandle<MockJobCreatedEvent>, IHandle<MockJobDeletedEvent> {
  constructor() {}

  /**
   * This is how we may setup subscriptions to domain events.
   */

  setupSubscriptions(): void {
    DomainEvents.register(this.handleJobCreatedEvent, MockJobCreatedEvent.name);
    DomainEvents.register(this.handleDeletedEvent, MockJobDeletedEvent.name);
  }

  /**
   * These are examples of how we define the handlers for domain events.
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleJobCreatedEvent(event: MockJobCreatedEvent): void {
    console.log('A job was created!!!');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDeletedEvent(event: MockJobDeletedEvent): void {
    console.log('A job was deleted!!!');
  }
}
