"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var roomSchema = new mongoose_1.default.Schema({
    roomName: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Users'
    },
    users: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Users'
    },
    privateRoom: {
        type: Boolean,
        default: true
    },
    maxUsers: {
        type: Number,
        default: 2
    }
});
var Room = mongoose_1.default.model('Rooms', roomSchema);
exports.default = Room;
