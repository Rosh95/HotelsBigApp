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
exports.ColumnsController = void 0;
const common_1 = require("@nestjs/common");
const columns_service_1 = require("./columns.service");
const user_decarator_1 = require("../decorators/user.decarator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const CreateColumnDto_1 = require("./dto/CreateColumnDto");
const UpdateColumnDto_1 = require("./dto/UpdateColumnDto");
const ReorderColumnDto_1 = require("./dto/ReorderColumnDto");
const swagger_1 = require("@nestjs/swagger");
let ColumnsController = class ColumnsController {
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    createColumn(dto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.columnsService.createColumn(userId, dto);
        });
    }
    updateColumn(columnId, dto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.columnsService.updateColumn(userId, columnId, dto);
        });
    }
    deleteColumn(columnId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.columnsService.deleteColumn(userId, columnId);
        });
    }
    moveColumn(columnId, dto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.columnsService.moveColumn(userId, columnId, dto);
        });
    }
};
exports.ColumnsController = ColumnsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a column' }),
    (0, swagger_1.ApiBody)({ type: CreateColumnDto_1.CreateColumnDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decarator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateColumnDto_1.CreateColumnDto, Number]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "createColumn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a column' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: UpdateColumnDto_1.UpdateColumnDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decarator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateColumnDto_1.UpdateColumnDto, Number]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "updateColumn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a column' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decarator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "deleteColumn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder a column' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: ReorderColumnDto_1.ReorderColumnDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Put)(':id/reorder'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decarator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ReorderColumnDto_1.ReorderColumnDto, Number]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "moveColumn", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, swagger_1.ApiTags)('columns'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('columns'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [columns_service_1.ColumnsService])
], ColumnsController);
//# sourceMappingURL=columns.controller.js.map