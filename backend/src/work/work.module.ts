import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { Work } from './work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  providers: [WorkService],
  controllers: [WorkController],
})
export class WorkModule {}
