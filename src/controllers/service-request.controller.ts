import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ServiceRequest} from '../models';
import {ServiceRequestRepository} from '../repositories';

export class ServiceRequestController {
  constructor(
    @repository(ServiceRequestRepository)
    public serviceRequestRepository : ServiceRequestRepository,
  ) {}

  @post('/service-requests', {
    responses: {
      '200': {
        description: 'ServiceRequest model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServiceRequest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceRequest, {
            title: 'NewServiceRequest',
            exclude: ['uuid'],
          }),
        },
      },
    })
    serviceRequest: Omit<ServiceRequest, 'uuid'>,
  ): Promise<ServiceRequest> {
    return this.serviceRequestRepository.create(serviceRequest);
  }

  @get('/service-requests/count', {
    responses: {
      '200': {
        description: 'ServiceRequest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ServiceRequest) where?: Where<ServiceRequest>,
  ): Promise<Count> {
    return this.serviceRequestRepository.count(where);
  }

  @get('/service-requests', {
    responses: {
      '200': {
        description: 'Array of ServiceRequest model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ServiceRequest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ServiceRequest) filter?: Filter<ServiceRequest>,
  ): Promise<ServiceRequest[]> {
    return this.serviceRequestRepository.find(filter);
  }

  @patch('/service-requests', {
    responses: {
      '200': {
        description: 'ServiceRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceRequest, {partial: true}),
        },
      },
    })
    serviceRequest: ServiceRequest,
    @param.where(ServiceRequest) where?: Where<ServiceRequest>,
  ): Promise<Count> {
    return this.serviceRequestRepository.updateAll(serviceRequest, where);
  }

  @get('/service-requests/{id}', {
    responses: {
      '200': {
        description: 'ServiceRequest model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServiceRequest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ServiceRequest, {exclude: 'where'}) filter?: FilterExcludingWhere<ServiceRequest>
  ): Promise<ServiceRequest> {
    return this.serviceRequestRepository.findById(id, filter);
  }

  @patch('/service-requests/{id}', {
    responses: {
      '204': {
        description: 'ServiceRequest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceRequest, {partial: true}),
        },
      },
    })
    serviceRequest: ServiceRequest,
  ): Promise<void> {
    await this.serviceRequestRepository.updateById(id, serviceRequest);
  }

  @put('/service-requests/{id}', {
    responses: {
      '204': {
        description: 'ServiceRequest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() serviceRequest: ServiceRequest,
  ): Promise<void> {
    await this.serviceRequestRepository.replaceById(id, serviceRequest);
  }

  @del('/service-requests/{id}', {
    responses: {
      '204': {
        description: 'ServiceRequest DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.serviceRequestRepository.deleteById(id);
  }
}
