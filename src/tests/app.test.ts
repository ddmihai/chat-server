import request from 'supertest';
import app from '../app';




/**
 *      Arrange a series of tests to 
*/
describe('[GET] /', () => {
    it('Will responde with JSON page not found if called other endpoint', async () => {
        const response = await request(app).get('/other-endpoint');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: "Invalid endpoint"});
        expect(response.header['content-type']).toEqual("application/json; charset=utf-8");
    });

    
    it('Will respond with "Home routing" JSON of correct API call', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Home routing"});
        expect(response.header['content-type']).toEqual("application/json; charset=utf-8");
    })
});

