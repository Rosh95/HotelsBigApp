import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {TasksModule} from "./tasks/tasks.module";
import {ProjectsModule} from "./projects/projects.module";
import {ColumnsModule} from "./columns/columns.module";
import {AuthModule} from "./auth/auth.module";
import {config} from 'dotenv';
import {ConfigModule} from "@nestjs/config";

config();
@Module({
  imports: [
      ConfigModule.forRoot({
    isGlobal: true,
  }),
    UsersModule, TasksModule, ProjectsModule, ColumnsModule, AuthModule]
})
export class AppModule {}
