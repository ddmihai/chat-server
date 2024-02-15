import express from 'express';
import MongoStore from 'connect-mongo';
import session, { SessionOptions } from 'express-session';
import dotenv from 'dotenv'
import userRouter from './routes/user.router';
dotenv.config();
import morgan from "morgan";
import cors from 'cors';


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus:  200
}));



/**
 *  Express sessions
*/
const sessionOption: SessionOptions = {
    secret:             process.env.SESSION_SECRET || '',
    resave:             false,
    saveUninitialized:  false,
    store:              MongoStore.create({ 
        mongoUrl: process.env.DATABASEURL,
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: { 
        secure:         app.get('env') === 'production',
        httpOnly:       app.get('env') === 'production',
        maxAge:         24 * 14 * 3600000,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}

app.use(session(sessionOption));
app.use(express.json());
app.use(morgan('common'));



//swaggerui
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config.swagger';
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




// Home router
app.get('/', (req, res, next) => res.json({
    message: 'Home routing'
}));


// User router
app.use('/api', userRouter);


// Not found router
app.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Invalid endpoint'
    })
})


export default app;