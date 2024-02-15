"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var userSignupSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(5),
    firstName: zod_1.z.string().min(4),
    lastName: zod_1.z.string().min(4),
    password: zod_1.z.string().min(8)
});
var userSignupValidation = function (req, res, next) {
    try {
        userSignupSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            // Parse the error message as JSON
            var errorObject = void 0;
            try {
                errorObject = JSON.parse(error.message);
            }
            catch (jsonError) {
                // If parsing fails, send the original message
                errorObject = { message: error.message };
            }
            res.status(400).json(errorObject);
        }
    }
};
exports.default = userSignupValidation;
