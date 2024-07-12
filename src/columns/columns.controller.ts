import {Controller, Post, Body, Param, Put, Delete, UseGuards, HttpCode, HttpStatus} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import {UserId} from "../decorators/user.decarator";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateColumnDto} from "./dto/CreateColumnDto";
import {UpdateColumnDto} from "./dto/UpdateColumnDto";
import {ReorderColumnDto} from "./dto/ReorderColumnDto";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('columns')
@ApiBearerAuth()
@Controller('columns')
@UseGuards(JwtAuthGuard)
export class ColumnsController {
    constructor(private columnsService: ColumnsService) {}

    @ApiOperation({ summary: 'Create a column' })
    @ApiBody({ type: CreateColumnDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createColumn(@Body() dto: CreateColumnDto, @UserId() userId: number) {
        return this.columnsService.createColumn(userId, dto);
    }

    @ApiOperation({ summary: 'Update a column' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateColumnDto })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    async updateColumn(
        @Param('id') columnId: number,
        @Body() dto: UpdateColumnDto,
        @UserId() userId: number
    ) {
        return this.columnsService.updateColumn(userId, columnId, dto);
    }

    @ApiOperation({ summary: 'Delete a column' })
    @ApiParam({ name: 'id', type: Number })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteColumn(@Param('id') columnId: number, @UserId() userId: number) {
        return this.columnsService.deleteColumn(userId, columnId);
    }

    @ApiOperation({ summary: 'Reorder a column' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: ReorderColumnDto })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id/reorder')
    async moveColumn(
        @Param('id') columnId: number,
        @Body() dto: ReorderColumnDto,
        @UserId() userId: number
    ) {
        return this.columnsService.moveColumn(userId, columnId, dto);
    }
}
