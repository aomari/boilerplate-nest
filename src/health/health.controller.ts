import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.db.pingCheck('database'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB heap size limit
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024), // 300MB RSS size limit
      () => this.disk.checkStorage('disk', { path: '/', thresholdPercent: 0.9 }), // 90% disk usage limit
    ]);
  }

  @Get('hello')
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Language for the greeting message (en or ar)',
    required: false,
    schema: {
      type: 'string',
      default: 'en',
    },
  })
  @ApiOperation({ summary: 'Get greeting message' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Greeting message returned successfully.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid language provided.' })
  async getHello(@I18n() i18n: I18nContext) {
    return await i18n.t('common.WELCOME');
  }
}
