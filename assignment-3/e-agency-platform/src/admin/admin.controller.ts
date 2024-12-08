import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';

@Roles(Role.Admin)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
<<<<<<< HEAD
    return this.adminService.registerAdmin(createAdminDto); 
=======
    return this.adminService.registerAdmin(createAdminDto);
>>>>>>> e9e2bb8e4cd3c69d90aca70b5fc582e930b50d38
  }

  @Get()
  findAll() {
<<<<<<< HEAD
    return this.adminService.getAllRegisteredData(1, 10, ''); 
=======
    return this.adminService.getAllRegisteredData(null,null,"");
>>>>>>> e9e2bb8e4cd3c69d90aca70b5fc582e930b50d38
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
<<<<<<< HEAD
    return this.adminService.getAdminById(id); 
=======
    return this.adminService.getAdminById(id);
>>>>>>> e9e2bb8e4cd3c69d90aca70b5fc582e930b50d38
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
<<<<<<< HEAD
    return this.adminService.updateAdmin(id, updateAdminDto); 
   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.softDeleteAdmin(id); 
  
=======
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.softDeleteAdmin(id);
>>>>>>> e9e2bb8e4cd3c69d90aca70b5fc582e930b50d38
  }
}
