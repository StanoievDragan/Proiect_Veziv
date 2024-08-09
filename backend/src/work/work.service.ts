import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private worksRepository: Repository<Work>,
  ) {}

  findAll(): Promise<Work[]> {
    return this.worksRepository.find();
  }

  findOne(id: number): Promise<Work> {
    return this.worksRepository.findOneBy({ id });
  }

  create(work: Work): Promise<Work> {
    return this.worksRepository.save(work);
  }

  async update(id: number, work: Work): Promise<void> {
    await this.worksRepository.update(id, work);
  }

  async remove(id: number): Promise<void> {
    await this.worksRepository.delete(id);
  }
}
