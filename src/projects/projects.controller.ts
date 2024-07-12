import {Controller, Get, Post, Body, Put, Param, Delete, Injectable, UseGuards, HttpStatus, HttpCode} from '@nestjs/common';
import {CreateProjectDto} from "./dto/CreateProjectDto";
import {UpdateProjectDto} from "./dto/UpdateColumnDto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UserId} from "../decorators/user.decarator";
import {ProjectsService} from "./projects.service";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
@Injectable()
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @ApiOperation({ summary: 'Create a project' })
    @ApiBody({ type: CreateProjectDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }

    @ApiOperation({ summary: 'Get all projects' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @ApiOperation({ summary: 'Get a project by id' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: String })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(+id);
    }

    @ApiOperation({ summary: 'Update a project' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateProjectDto })
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto,
        @UserId() currentUserId: number
    ) {
        console.log(currentUserId + '!!!');
        return this.projectsService.update(+id, updateProjectDto, currentUserId);
    }

    @ApiOperation({ summary: 'Delete a project' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: String })
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: string, @UserId() currentUserId: number) {
        return this.projectsService.remove(+id, currentUserId);
    }
}
