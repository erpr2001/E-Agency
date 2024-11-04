import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
    constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) { }

    // pagination
    async getAll(page: number = 1, limit: number = 10, fields?: string) {
        const skip = (page - 1) * limit;
        const projection = fields ? fields.split(',').join(' ') : ''; // limit fields

        return this.bookingModel
            .find({ deletedAt: null }) // soft delete
            .select(projection)
            .skip(skip)
            .limit(limit)
            .exec();
    }

    async getById(id: string, fields?: string) {
        const projection = fields ? fields.split(',').join(' ') : '';
        return this.bookingModel.findOne({ _id: id, deletedAt: null }).select(projection).exec();
    }

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const newBooking = new this.bookingModel(createBookingDto);
        return newBooking.save();
    }

    async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
        return this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
    }

    async softDelete(id: string): Promise<Booking> {
        return this.bookingModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).exec();
    }
}