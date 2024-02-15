import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";

const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check for the user prop that attached to session at login page
        if (req.session && req.session.user) {
            let userData = await User.findOne({ _id: req.session.user });
            if(userData) {
                next();
            } 
            else {
                return res.status(401).send('Unauthorized');
            }
        }
        return res.status(401).send('Unauthorized');
    } 
    catch (error) {
        return res.status(401).send('Unauthorized');
    }
};

export default checkAuthentication;