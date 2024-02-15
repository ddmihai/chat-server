jest.resetModules();
import request from 'supertest';
import app from '../../../app';
import bcrypt from 'bcryptjs';
import User from '../../../models/user.model';

jest.mock('../../../models/user.model');

describe('Testing login capabilities with supertest', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    })

    it('Throw invalid credentials if one or more login details are incorrect', async () => {
        
        User.findOne = jest.fn().mockResolvedValue(null);

        const response = await request(app).post('/api/login').send({
            email: 'incorrect@email.com',
            password: 'wrongpassword'
        });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Invalid credentials' });
        expect(response.header).toHaveProperty('content-type')
    });


    it('Testing similar incorrect detials credentials...', async () => {
        const user = await User.create({
            email: 'example2@gmail.com',
            password: await bcrypt.hash('passwordPlainString', 10)
        });

        const spyFindUser = jest.spyOn(User, 'findOne');

        const response = await request(app)
            .post('/api/login')
            .send({ email: 'test@example.com', password: 'password' });

            
        expect(response.body).toEqual({"message": "Invalid credentials"});
        expect(response.status).toBe(404);
        expect(spyFindUser).toHaveBeenCalledTimes(1);
        expect(spyFindUser).toHaveBeenCalledWith({"email": "test@example.com"});
    });
})