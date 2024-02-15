"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var express_session_1 = __importDefault(require("express-session"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_router_1 = __importDefault(require("./routes/user.router"));
dotenv_1.default.config();
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));
/**
 *  Express sessions
*/
var sessionOption = {
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.DATABASEURL,
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
        secure: app.get('env') === 'production',
        httpOnly: app.get('env') === 'production',
        maxAge: 24 * 14 * 3600000,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
};
app.use((0, express_session_1.default)(sessionOption));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('common'));
//swaggerui
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var config_swagger_1 = __importDefault(require("./config.swagger"));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(config_swagger_1.default));
// Home router
app.get('/', function (req, res, next) { return res.json({
    message: 'Home routing'
}); });
// User router
app.use('/api', user_router_1.default);
// Not found router
app.use('*', function (req, res, next) {
    res.status(404).json({
        message: 'Invalid endpoint'
    });
});
exports.default = app;
