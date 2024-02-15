"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var path_1 = __importDefault(require("path"));
var userSchemaPath = path_1.default.join(__dirname, 'middlewares', 'validators', 'userSignup.swagger.yaml');
var userRouter = path_1.default.join(__dirname, 'routes', 'user.swagger.yaml');
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chat app with Sockets.io and HTTP',
            version: '1.0',
            contact: {
                email: 'sasdaniel9@gmail.com',
                name: 'Daniel Mihai'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local env server. Localhsot...'
            }
        ]
    },
    tags: [
        {
            name: 'Users',
            description: 'User manipulation endpoints'
        }
    ],
    //Array of API routes
    apis: [userRouter, userSchemaPath]
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
