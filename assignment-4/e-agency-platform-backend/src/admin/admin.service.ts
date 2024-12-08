// src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async registerAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = new this.adminModel(createAdminDto);
    return await newAdmin.save();
  }

  async loginAdmin(username: string, password: string): Promise<{ token: string }> {
    const admin = await this.adminModel.findOne({ username });
    if (!admin || admin.isDeleted) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }

  async getAllRegisteredData(page: number, limit: number, fields: string) {
    const projection = fields ? fields.split(',').join(' ') : '';
    return {
      admins: await this.adminModel
        .find({ isDeleted: false })
        .select(projection)
        .limit(limit)
        .skip((page - 1) * limit),
    };
  }

  async softDeleteAdmin(id: string): Promise<Admin> {
    return await this.adminModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async getAdminById(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).select('-password');
    if (!admin || admin.isDeleted) throw new Error('Admin not found');
    return admin;
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const updatedFields: Partial<Admin> = { ...updateAdminDto };
    if (updateAdminDto.password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(updateAdminDto.password, salt);
    }
    return await this.adminModel.findByIdAndUpdate(id, updatedFields, { new: true });
  }
}
