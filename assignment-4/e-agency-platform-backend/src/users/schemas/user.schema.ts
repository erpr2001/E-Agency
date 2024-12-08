import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/role.enum';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true })
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phone: string;

    @Prop({type: [String], enum: Role})
    roles: string[];

    @Prop()
    profileImage: string;

    @Prop({
        type: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
        },
    })
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
    };

    @Prop({ default: null })
    deletedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
