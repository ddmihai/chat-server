import { NextFunction, Request, Response } from "express";
import { z } from "zod";


const userSignupSchema = z.object({
    email:          z.string().email().min(5),
    firstName:      z.string().min(4), 
    lastName:       z.string().min(4),    
    password:       z.string().min(8)
})

const userSignupValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        userSignupSchema.parse(req.body);
        next();
    } 
    catch (error) {
        if (error instanceof Error) {
                // Parse the error message as JSON
            let errorObject;
            try {
                errorObject = JSON.parse(error.message);
            } catch (jsonError) {
                // If parsing fails, send the original message
                errorObject = { message: error.message };
            }
            res.status(400).json(errorObject);    
        }
    }
}

export default userSignupValidation;