import { Controller, Get, Post, Param, Query, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('fields') fields?: string,
    ) {
        return this.usersService.getAll(page, limit, fields);
    }

    @Get(':id')
    getById(@Param('id') id: string, @Query('fields') fields?: string) {
        return this.usersService.getById(id, fields);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    softDelete(@Param('id') id: string) {
        return this.usersService.softDelete(id);
    }
}