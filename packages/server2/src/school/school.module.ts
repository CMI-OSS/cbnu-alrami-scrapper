import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaceModule } from "src/place/place.module";

import { School } from "./entities/school.entity";
import { SchoolController } from "./school.controller";
import { SchoolService } from "./school.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ School ]), PlaceModule ],
  controllers: [ SchoolController ],
  providers: [ SchoolService ],
})
export class SchoolModule {}