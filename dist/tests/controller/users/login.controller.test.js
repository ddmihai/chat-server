"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.resetModules();
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../../../app"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var user_model_1 = __importDefault(require("../../../models/user.model"));
jest.mock('../../../models/user.model');
describe('Testing login capabilities with supertest', function () {
    afterEach(function () {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });
    it('Throw invalid credentials if one or more login details are incorrect', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_model_1.default.findOne = jest.fn().mockResolvedValue(null);
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/api/login').send({
                            email: 'incorrect@email.com',
                            password: 'wrongpassword'
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body).toEqual({ message: 'Invalid credentials' });
                    expect(response.header).toHaveProperty('content-type');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Testing similar incorrect detials credentials...', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, _a, _b, spyFindUser, response;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = user_model_1.default).create;
                    _c = {
                        email: 'example2@gmail.com'
                    };
                    return [4 /*yield*/, bcryptjs_1.default.hash('passwordPlainString', 10)];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                            _c)])];
                case 2:
                    user = _d.sent();
                    spyFindUser = jest.spyOn(user_model_1.default, 'findOne');
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .post('/api/login')
                            .send({ email: 'test@example.com', password: 'password' })];
                case 3:
                    response = _d.sent();
                    expect(response.body).toEqual({ "message": "Invalid credentials" });
                    expect(response.status).toBe(404);
                    expect(spyFindUser).toHaveBeenCalledTimes(1);
                    expect(spyFindUser).toHaveBeenCalledWith({ "email": "test@example.com" });
                    return [2 /*return*/];
            }
        });
    }); });
});
