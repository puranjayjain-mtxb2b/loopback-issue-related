import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ServiceRequest,
  ServiceQueue,
} from '../models';
import {ServiceRequestRepository} from '../repositories';

export class ServiceRequestServiceQueueController {
  constructor(
    @repository(ServiceRequestRepository)
    public serviceRequestRepository: ServiceRequestRepository,
  ) { }

  @get('/service-requests/{id}/service-queue', {
    responses: {
      '200': {
        description: 'ServiceQueue belonging to ServiceRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ServiceQueue)},
          },
        },
      },
    },
  })
  async getServiceQueue(
    @param.path.string('id') id: typeof ServiceRequest.prototype.uuid,
  ): Promise<ServiceQueue> {
    return this.serviceRequestRepository.serviceQueue(id);
  }
}
