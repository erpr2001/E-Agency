import { IsNotEmpty, IsEmail } from '@nestjs/class-validator';

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
