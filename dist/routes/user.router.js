"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var signup_controller_1 = __importDefault(require("../controller/users/signup.controller"));
var userSignup_schema_1 = __importDefault(require("../middlewares/validators/userSignup.schema"));
var login_controller_1 = __importDefault(require("../controller/users/login.controller"));
var userInfo_controller_1 = __importDefault(require("../controller/users/userInfo.controller"));
var userRouter = (0, express_1.Router)();
userRouter.post('/user', userSignup_schema_1.default, signup_controller_1.default);
userRouter.post('/login', login_controller_1.default);
userRouter.get('/user-info', userInfo_controller_1.default);
exports.default = userRouter;
