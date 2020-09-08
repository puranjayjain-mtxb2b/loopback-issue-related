import {Entity, model, property} from '@loopback/repository';

@model()
export class ServiceQueue extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: 'uuid',
  })
  uuid?: string;

  @property({
    type: 'string',
  })
  name?: string;

  constructor(data?: Partial<ServiceQueue>) {
    super(data);
  }
}

export interface ServiceQueueRelations {
  // describe navigational properties here
}

export type ServiceQueueWithRelations = ServiceQueue & ServiceQueueRelations;
