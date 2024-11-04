export class CreateUserDto {
    readonly userId: string;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly phone?: string;
    readonly role?: string;
    readonly profileImage?: string;
    readonly address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
    };
}