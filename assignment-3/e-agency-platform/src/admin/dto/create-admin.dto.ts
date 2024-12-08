import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}
