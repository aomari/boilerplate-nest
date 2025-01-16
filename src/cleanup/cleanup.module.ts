import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupService } from './cleanup.service';
import { LoggerModule } from 'src/logger';

@Module({
  imports: [ScheduleModule.forRoot(), LoggerModule],
  providers: [CleanupService],
})
export class CleanupModule {}
