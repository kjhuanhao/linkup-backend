import { IsNotEmpty } from "class-validator"

export class CreateGuideDto {
  @IsNotEmpty()
  question: string
  answer: string
}