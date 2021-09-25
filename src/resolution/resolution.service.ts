import { Inject, Injectable } from '@nestjs/common';
import { ResolutionRepository } from './interfaces/repository.interface';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { Resolution } from './interfaces/resolution.interface';
import { v1 as uuidv1 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResolutionService {
  constructor(
    @Inject('RESOLUTION_REPOSITORY')
    private readonly repository: ResolutionRepository,
    private readonly configService: ConfigService,
  ) {}

  async create(createResolutionDto: CreateResolutionDto): Promise<Resolution> {
    const resolution: Resolution = {
      ...createResolutionDto,
      id: uuidv1(),
      delay: this.configService.get('TTL_DELAY'),
      createdTime: `${new Date().getTime()}`,
    };
    return await this.repository.addResolution(resolution);
  }

  async getAllResolutions(patientID: string): Promise<Resolution[]> {
    return await this.repository.getAllResolutions(patientID);
  }

  async deleteResolution(resolutionID: string): Promise<string> {
    return await this.repository.deleteResolution(resolutionID);
  }
}