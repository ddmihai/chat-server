import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";
import bcrypt from 'bcryptjs';


const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(500).json({
                message: 'User already exists'
            });
        }

        else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = new User({ email, firstName, lastName, password: hash });
            await newUser.save();
            res.status(201).json({
                message: 'User created'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:    'Error while creating a user',
            refference: 'signup.controller.ts',
            error:      error
        })
    }
};

export default signupController;