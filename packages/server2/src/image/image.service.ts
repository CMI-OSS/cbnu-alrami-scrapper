import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AwsService } from "src/aws/aws.service";
import { In, Repository } from "typeorm";

import { Image } from "./entities/image.entity";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,

    private awsService: AwsService,
  ) {}

  async upload(images: Express.Multer.File[]): Promise<Image[]> {
    const imageUrls = this.awsService.uploadImages(images);

    const response = await this.imageRepository.save(
      (await imageUrls).map((image) => ({ url: image })),
    );

    return response;
  }

  async findImages(imageIds: number[]) {
    if (imageIds.length === 0) return [];

    return this.imageRepository.find({
      where: { id: In(imageIds) },
    });
  }
}
