import { Controller, Get, Post, Param, Query, Body, Patch, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Get()
    getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('fields') fields?: string,
    ) {
        return this.bookingsService.getAll(page, limit, fields);
    }

    @Get(':id')
    getById(@Param('id') id: string, @Query('fields') fields?: string) {
        return this.bookingsService.getById(id, fields);
    }

    @Post()
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(createBookingDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
        return this.bookingsService.update(id, updateBookingDto);
    }

    @Delete(':id')
    softDelete(@Param('id') id: string) {
        return this.bookingsService.softDelete(id);
    }
}