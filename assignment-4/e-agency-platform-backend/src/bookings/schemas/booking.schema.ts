import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
    @Prop({ required: true, unique: true })
    bookingId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    agencyId: string;

    @Prop()
    bookingDate: Date;

    @Prop()
    bookingStatus: string;

    @Prop()
    notes: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);