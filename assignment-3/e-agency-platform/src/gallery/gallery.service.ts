import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery } from './schemas/gallery.schema';

@Injectable()
export class GalleryService {
  constructor(@InjectModel(Gallery.name) private galleryModel: Model<Gallery>) {}

  async createGalleryItem(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    const newGalleryItem = new this.galleryModel(createGalleryDto);
    return await newGalleryItem.save();
  }

  async getAllGalleryItems(page: number = 1, limit: number = 10, fields?: string): Promise<Gallery[]> {
    return this.galleryModel
      .find({ isDeleted: false })
      .select(fields ? fields.split(',').join(' ') : '')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

  async getGalleryItemById(id: string): Promise<Gallery> {
    const galleryItem = await this.galleryModel.findById(id);
    if (!galleryItem || galleryItem.isDeleted) {
      throw new NotFoundException('Gallery item not found');
    }
    return galleryItem;
  }

  async updateGalleryItem(id: string, updateGalleryDto: UpdateGalleryDto): Promise<Gallery> {
    const updatedGalleryItem = await this.galleryModel.findByIdAndUpdate(id, updateGalleryDto, { new: true });
    if (!updatedGalleryItem || updatedGalleryItem.isDeleted) {
      throw new NotFoundException('Gallery item not found');
    }
    return updatedGalleryItem;
  }

  async softDeleteGalleryItem(id: string): Promise<Gallery> {
    const galleryItem = await this.galleryModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!galleryItem) {
      throw new NotFoundException('Gallery item not found');
    }
    return galleryItem;
  }
}