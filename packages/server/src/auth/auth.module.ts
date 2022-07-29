import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "src/admin/admin.module";
import { ACCESS_PRIVATE_KEY } from "src/commons/constants/constants";
import { UserModule } from "src/user/user.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    AdminModule,
    UserModule,
    JwtModule.register({
      secret: ACCESS_PRIVATE_KEY,
      signOptions: { expiresIn: "180m" },
    }),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
})
export class AuthModule {}
