import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
