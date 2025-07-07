import { Module } from '@nestjs/common';
import { AuthModule } from './main/auth/auth.module';
import { UserModule } from './main/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './main/product/product.module';
import { CategoryModule } from './main/category/category.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
