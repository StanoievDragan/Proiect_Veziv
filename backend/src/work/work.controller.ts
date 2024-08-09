import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Work } from './work.entity';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  findAll(): Promise<Work[]> {
    return this.workService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + ext); 
        },
      }),
    }),
  )
  async create(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Work> {
    const { title, description, clientLink, status } = body;

    if (!title || !description) {
      throw new HttpException(
        'Title and description are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const work = new Work();
    work.title = title;
    work.description = description;
    work.clientLink = clientLink || '';
    work.status = status || 'hidden';

    if (file) {
      work.image = file.filename; 
    }

    return this.workService.create(work);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + ext); 
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const { title, description, clientLink, status } = body;

    const work = await this.workService.findOne(id);
    if (!work) {
      throw new HttpException('Work not found', HttpStatus.NOT_FOUND);
    }

    work.title = title || work.title;
    work.description = description || work.description;
    work.clientLink = clientLink || work.clientLink;
    work.status = status || work.status;

    if (file) {
      work.image = file.filename; 
    }

    await this.workService.update(id, work);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.workService.remove(id);
  }
}
