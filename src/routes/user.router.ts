import { Router } from "express";
import signupController from "../controller/users/signup.controller";
import userSignupValidation from "../middlewares/validators/userSignup.schema";
import loginController from "../controller/users/login.controller";
import userInfoController from "../controller/users/userInfo.controller";

const userRouter = Router();


userRouter.post('/user',        userSignupValidation, signupController);
userRouter.post('/login',       loginController);
userRouter.get('/user-info',    userInfoController);

export default userRouter;