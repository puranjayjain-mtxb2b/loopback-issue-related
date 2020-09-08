import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ServiceQueue} from './service-queue.model';

@model({
  settings: {
    foreignKeys: {
      servicequeueuuid: {
        name: 'servicequeueuuid',
        entity: 'ServiceQueue',
        entityKey: 'uuid',
        foreignKey: 'servicequeueuuid',
      },
    },
  },
})
export class ServiceRequest extends Entity {
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

  @belongsTo(() => ServiceQueue, {name: 'serviceQueue'})
  serviceQueueUUID: string;

  constructor(data?: Partial<ServiceRequest>) {
    super(data);
  }
}

export interface ServiceRequestRelations {
  // describe navigational properties here
}

export type ServiceRequestWithRelations = ServiceRequest &
  ServiceRequestRelations;
