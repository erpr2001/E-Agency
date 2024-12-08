import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {Express} from 'express';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() body: CreateGalleryDto) {
    body.imageUrl = file.path; // Add the file path to the DTO
    return this.galleryService.createGalleryItem(body);
  }

  @Get()
  async getAllGalleryItems(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('fields') fields?: string,
  ) {
    return this.galleryService.getAllGalleryItems(page, limit, fields);
  }

  @Get(':id')
  async getGalleryItemById(@Param('id') id: string) {
    return this.galleryService.getGalleryItemById(id);
  }

  @Patch(':id')
  async updateGalleryItem(
    @Param('id') id: string, 
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.galleryService.updateGalleryItem(id, updateGalleryDto);
  }

  @Delete(':id')
  async softDeleteGalleryItem(@Param('id') id: string) {
    return this.galleryService.softDeleteGalleryItem(id);
  }
}