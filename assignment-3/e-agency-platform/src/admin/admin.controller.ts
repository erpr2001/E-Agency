import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.registerAdmin(createAdminDto); 
  }

  @Get()
  findAll() {
    return this.adminService.getAllRegisteredData(1, 10, ''); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.getAdminById(id); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, updateAdminDto); 
   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.softDeleteAdmin(id); 
  
  }
}
