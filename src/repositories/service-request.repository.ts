import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ServiceRequest, ServiceRequestRelations, ServiceQueue} from '../models';
import {PostgresdbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ServiceQueueRepository} from './service-queue.repository';

export class ServiceRequestRepository extends DefaultCrudRepository<
  ServiceRequest,
  typeof ServiceRequest.prototype.uuid,
  ServiceRequestRelations
> {

  public readonly serviceQueue: BelongsToAccessor<ServiceQueue, typeof ServiceRequest.prototype.uuid>;

  constructor(
    @inject('datasources.postgresdb') dataSource: PostgresdbDataSource, @repository.getter('ServiceQueueRepository') protected serviceQueueRepositoryGetter: Getter<ServiceQueueRepository>,
  ) {
    super(ServiceRequest, dataSource);
    this.serviceQueue = this.createBelongsToAccessorFor('serviceQueue', serviceQueueRepositoryGetter,);
    this.registerInclusionResolver('serviceQueue', this.serviceQueue.inclusionResolver);
  }
}
