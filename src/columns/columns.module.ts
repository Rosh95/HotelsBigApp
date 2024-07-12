import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import {PrismaService} from "../../prisma/prisma.service";

@Module({
  providers: [ColumnsService, PrismaService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}
