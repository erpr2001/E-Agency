import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    // pagination
    async getAll(page: number = 1, limit: number = 10, fields?: string) {
        const skip = (page - 1) * limit;
        const projection = fields ? fields.split(',').join(' ') : ''; // limit fields

        return this.userModel
            .find({ deletedAt: null }) // soft delete
            .select(projection)
            .skip(skip)
            .limit(limit)
            .exec();
    }

    async getById(id: string, fields?: string) {
        const projection = fields ? fields.split(',').join(' ') : '';
        return this.userModel.findOne({ _id: id, deletedAt: null }).select(projection).exec();
    }

    async getByEmail(email: string, fields?: string) {
        const projection = fields ? fields.split(',').join(' ') : '';
        const user: User = await this.userModel.findOne({ email: email, deletedAt: null }).select(projection).exec();
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async softDelete(id: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).exec();
    }
}