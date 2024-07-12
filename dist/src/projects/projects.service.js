"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createProjectDto) {
        return this.prisma.project.create({ data: createProjectDto });
    }
    findAll() {
        return this.prisma.project.findMany({
            include: {
                columns: {
                    include: {
                        project: true
                    },
                    orderBy: { order: 'asc' },
                },
            }
        });
    }
    findOne(id) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                columns: {
                    include: {
                        project: true
                    },
                    orderBy: { order: 'asc' },
                },
            }
        });
    }
    update(projectId, updateProjectDto, currentUserId) {
        if (currentUserId !== updateProjectDto.userId) {
            throw new common_1.BadRequestException('this project belong to another user or doesn`t exist');
        }
        return this.prisma.project.update({
            where: { id: projectId },
            data: updateProjectDto,
        });
    }
    remove(projectId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentProject = yield this.prisma.project.findUnique({
                where: {
                    id: projectId
                }
            });
            if (!currentProject || currentUserId !== currentProject.userId) {
                throw new common_1.BadRequestException('this project belong to another user or doesn`t exist');
            }
            const isDeleted = yield this.prisma.project.delete({ where: { id: projectId } });
            return isDeleted.id || 'false';
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map