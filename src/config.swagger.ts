import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';

const userSchemaPath = path.join(__dirname, 'middlewares', 'validators', 'userSignup.swagger.yaml');
const userRouter = path.join(__dirname, 'routes', 'user.swagger.yaml');


const options: swaggerJSDoc.Options = {
    definition: {
        openapi:    '3.0.0',
        info: {
            title:  'Chat app with Sockets.io and HTTP',
            version: '1.0',
            contact: {
                email: 'sasdaniel9@gmail.com',
                name: 'Daniel Mihai'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local env server. Localhsot...'
            }
        ]
    },



    tags: [
        {
            name: 'Users',
            description: 'User manipulation endpoints'
        }
    ],

    //Array of API routes
    apis: [userRouter, userSchemaPath]
}


const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
