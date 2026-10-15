import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoClientService } from '../database/mongo.client';
import { HealthResponseDto } from './dto/health-response.dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly mongoClient: MongoClientService) {}

  @Get()
  @ApiOperation({ summary: 'Check API and database availability' })
  @ApiOkResponse({ type: HealthResponseDto })
  async getStatus(): Promise<HealthResponseDto> {
    await this.mongoClient.ping();

    return {
      status: 'ok',
      service: 'vishlist-api',
      timestamp: new Date().toISOString(),
      database: 'ok',
    };
  }
}
