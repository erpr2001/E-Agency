import {IsNotEmpty, IsString} from 'class-validator';
export class CreateGalleryDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    imageUrl: string; // Path of the uploaded image
}
