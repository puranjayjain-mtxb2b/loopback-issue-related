import {DefaultCrudRepository} from '@loopback/repository';
import {ServiceQueue, ServiceQueueRelations} from '../models';
import {PostgresdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServiceQueueRepository extends DefaultCrudRepository<
  ServiceQueue,
  typeof ServiceQueue.prototype.uuid,
  ServiceQueueRelations
> {
  constructor(
    @inject('datasources.postgresdb') dataSource: PostgresdbDataSource,
  ) {
    super(ServiceQueue, dataSource);
  }
}
