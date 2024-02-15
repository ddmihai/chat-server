import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";
import bcrypt from 'bcryptjs';



declare module 'express-session' {
    interface SessionData {
        user?: any; 
    }
}


const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const userExistingInDatabase = await User.findOne({ email });

        if (!userExistingInDatabase) {
            return res.status(404).json({
                message: 'Invalid credentials'
            });
        }

        else if (userExistingInDatabase) {
            const matchPassword = await bcrypt.compare(password, userExistingInDatabase?.password);
            if (!matchPassword) {
                return res.status(404).json({
                    message: 'Invalid credentials'
                });
            }

            req.session.user = userExistingInDatabase._id;

            if (req.session.user) {
                return res.status(200).json({
                    message: 'Login successful'
                });
            }
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:    'Error while login user',
            refference: 'login.controller.ts',
            error:      error
        })
    }
}

export default loginController;