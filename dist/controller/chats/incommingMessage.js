"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncommingMessageController = void 0;
var IncommingMessageController = function (data, io) {
    io.to(data.roomMongoDBObjectId).emit('new_message', {
        message: data.message,
        author: data.author
    });
};
exports.IncommingMessageController = IncommingMessageController;
