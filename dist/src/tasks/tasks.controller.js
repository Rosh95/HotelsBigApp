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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const CreateTaskDto_1 = require("./dto/CreateTaskDto");
const user_decarator_1 = require("../decorators/user.decarator");
const UpdateTaskDto_1 = require("./dto/UpdateTaskDto");
const ReorderTaskDto_1 = require("./dto/ReorderTaskDto");
const swagger_1 = require("@nestjs/swagger");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    createTask(dto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.createTask(userId, dto);
        });
    }
    updateTask(taskId, dto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.updateTask(userId, taskId, dto);
        });
    }
    deleteTask(taskId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.deleteTask(userId, taskId);
        });
    }
    moveTask(taskId, dto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.moveTask(userId, taskId, dto);
        });
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a task' }),
    (0, swagger_1.ApiBody)({ type: CreateTaskDto_1.CreateTaskDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decarator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTaskDto_1.CreateTaskDto, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a task' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: UpdateTaskDto_1.UpdateTaskDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decarator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateTaskDto_1.UpdateTaskDto, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a task' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decarator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder a task' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: ReorderTaskDto_1.ReorderTaskDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Put)(':id/reorder'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decarator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ReorderTaskDto_1.ReorderTaskDto, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "moveTask", null);
exports.TasksController = TasksController = __decorate([
    (0, swagger_1.ApiTags)('tasks'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map