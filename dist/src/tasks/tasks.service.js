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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createTask(userId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = yield this.prisma.column.findUnique({
                where: { id: dto.columnId },
                include: { project: true },
            });
            if (!column || column.project.userId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            const tasksCount = yield this.prisma.task.count({
                where: { columnId: dto.columnId },
            });
            return this.prisma.task.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    createdAt: new Date(),
                    order: tasksCount + 1,
                    columnId: dto.columnId,
                },
            });
        });
    }
    updateTask(userId, taskId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.prisma.task.findUnique({
                where: { id: taskId },
                include: { column: { include: { project: true } } },
            });
            if (!task || task.column.project.userId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            return this.prisma.task.update({
                where: { id: taskId },
                data: {
                    title: dto.title,
                    description: dto.description,
                },
            });
        });
    }
    deleteTask(userId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.prisma.task.findUnique({
                where: { id: taskId },
                include: { column: { include: { project: true } } },
            });
            if (!task || task.column.project.userId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            yield this.prisma.task.delete({ where: { id: taskId } });
            yield this.reorderTasks(task.columnId);
        });
    }
    reorderTasks(columnId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.prisma.task.findMany({
                where: { columnId },
                orderBy: { order: 'asc' },
            });
            for (let i = 0; i < tasks.length; i++) {
                yield this.prisma.task.update({
                    where: { id: tasks[i].id },
                    data: { order: i + 1 },
                });
            }
        });
    }
    moveTask(userId, taskId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.prisma.task.findUnique({
                where: { id: taskId },
                include: { column: { include: { project: true } } },
            });
            if (!task || task.column.project.userId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            const oldColumnId = task.columnId;
            const newColumnId = dto.newColumnId;
            const tasksInOldColumn = yield this.prisma.task.findMany({
                where: { columnId: oldColumnId },
                orderBy: { order: 'asc' },
            });
            const tasksInNewColumn = yield this.prisma.task.findMany({
                where: { columnId: newColumnId },
                orderBy: { order: 'asc' },
            });
            const oldPosition = task.order;
            const newPosition = dto.newPosition;
            if (newPosition < 1 || newPosition > tasksInNewColumn.length + 1) {
                throw new common_1.NotFoundException('Invalid position');
            }
            const updatedOldColumnTasks = tasksInOldColumn
                .filter(t => t.id !== taskId)
                .map((t, index) => (Object.assign(Object.assign({}, t), { order: index + 1 })));
            const updatedNewColumnTasks = [
                ...tasksInNewColumn.slice(0, newPosition - 1),
                Object.assign(Object.assign({}, task), { order: newPosition, columnId: newColumnId }),
                ...tasksInNewColumn.slice(newPosition - 1).map(t => (Object.assign(Object.assign({}, t), { order: t.order + 1 }))),
            ];
            const updatePromises = [
                ...updatedOldColumnTasks.map(t => this.prisma.task.update({
                    where: { id: t.id },
                    data: { order: t.order },
                })),
                ...updatedNewColumnTasks.map(t => this.prisma.task.update({
                    where: { id: t.id },
                    data: {
                        order: t.order,
                        columnId: t.columnId,
                    },
                })),
            ];
            yield Promise.all(updatePromises);
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map