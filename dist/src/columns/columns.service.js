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
exports.ColumnsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ColumnsService = class ColumnsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createColumn(userId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.prisma.project.findUnique({
                where: { id: dto.projectId },
            });
            if (!project || project.userId !== userId) {
                throw new common_1.ForbiddenException('this project belong to another user or doesn`t exist');
            }
            const columnsCount = yield this.prisma.column.count({
                where: { projectId: dto.projectId },
            });
            return this.prisma.column.create({
                data: {
                    name: dto.name,
                    order: columnsCount + 1,
                    projectId: dto.projectId,
                },
            });
        });
    }
    updateColumn(userId, columnId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = yield this.prisma.column.findUnique({
                where: { id: columnId },
                include: { project: true },
            });
            if (!column || column.project.userId !== userId) {
                throw new common_1.ForbiddenException('this column belong to another user or doesn`t exist');
            }
            return this.prisma.column.update({
                where: { id: columnId },
                data: { name: dto.name },
            });
        });
    }
    deleteColumn(userId, columnId) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = yield this.prisma.column.findUnique({
                where: { id: columnId },
                include: { project: true },
            });
            if (!column || column.project.userId !== userId) {
                throw new common_1.ForbiddenException('this column belong to another user or doesn`t exist');
            }
            yield this.prisma.column.delete({ where: { id: columnId } });
            yield this.reorderColumns(column.projectId);
        });
    }
    reorderColumns(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = yield this.prisma.column.findMany({
                where: { projectId },
                orderBy: { order: 'asc' },
            });
            for (let i = 0; i < columns.length; i++) {
                yield this.prisma.column.update({
                    where: { id: columns[i].id },
                    data: { order: i + 1 },
                });
            }
        });
    }
    moveColumn(userId, columnId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = yield this.prisma.column.findUnique({
                where: { id: columnId },
                include: { project: true },
            });
            if (!column || column.project.userId !== userId) {
                throw new common_1.ForbiddenException('this column belong to another user or doesn`t exist');
            }
            const columns = yield this.prisma.column.findMany({
                where: { projectId: column.projectId },
                orderBy: { order: 'asc' },
            });
            const oldPosition = column.order;
            const newPosition = dto.newPosition;
            if (newPosition < 1 || newPosition > columns.length) {
                throw new common_1.NotFoundException('Invalid position');
            }
            const updatedColumns = columns.map(col => {
                if (col.order === oldPosition) {
                    return Object.assign(Object.assign({}, col), { order: newPosition });
                }
                else if (oldPosition < newPosition && col.order > oldPosition && col.order <= newPosition) {
                    return Object.assign(Object.assign({}, col), { order: col.order - 1 });
                }
                else if (oldPosition > newPosition && col.order < oldPosition && col.order >= newPosition) {
                    return Object.assign(Object.assign({}, col), { order: col.order + 1 });
                }
                return col;
            });
            const updatePromises = updatedColumns.map(col => this.prisma.column.update({
                where: { id: col.id },
                data: { order: col.order },
            }));
            yield Promise.all(updatePromises);
        });
    }
};
exports.ColumnsService = ColumnsService;
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ColumnsService);
//# sourceMappingURL=columns.service.js.map