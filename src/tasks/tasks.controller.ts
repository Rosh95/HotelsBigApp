import {Controller, Post, Body, Param, Put, Delete, UseGuards, HttpCode, HttpStatus} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateTaskDto} from "./dto/CreateTaskDto";
import {UserId} from "../decorators/user.decarator";
import {UpdateTaskDto} from "./dto/UpdateTaskDto";
import {ReorderTaskDto} from "./dto/ReorderTaskDto";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @ApiOperation({ summary: 'Create a task' })
    @ApiBody({ type: CreateTaskDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createTask(@Body() dto: CreateTaskDto, @UserId() userId: number) {
        return this.tasksService.createTask(userId, dto);
    }

    @ApiOperation({ summary: 'Update a task' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateTaskDto })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    async updateTask(
        @Param('id') taskId: number,
        @Body() dto: UpdateTaskDto,
        @UserId() userId: number
    ) {
        return this.tasksService.updateTask(userId, taskId, dto);
    }

    @ApiOperation({ summary: 'Delete a task' })
    @ApiParam({ name: 'id', type: Number })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteTask(@Param('id') taskId: number, @UserId() userId: number) {
        return this.tasksService.deleteTask(userId, taskId);
    }

    @ApiOperation({ summary: 'Reorder a task' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: ReorderTaskDto })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id/reorder')
    async moveTask(
        @Param('id') taskId: number,
        @Body() dto: ReorderTaskDto,
        @UserId() userId: number
    ) {
        return this.tasksService.moveTask(userId, taskId, dto);
    }
}
