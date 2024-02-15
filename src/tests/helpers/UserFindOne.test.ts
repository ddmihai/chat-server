jest.mock('../../models/user.model');
import { FindUserByProp } from "../../helpers/UserFindOne";
import User from "../../models/user.model";


/**
 *      This test is more to be focused to errors... test everithing, from correct response to invalid arguments...
*/
describe('Test find one user by key/prop', () => {

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    })

    it('Will return a user as object', async () => {
        const mockedData = {
            _id: '65c76f07c17f6f2f1210d8b7',
            email: "example22@gmail.com",
            firstName: "John",
            lastName: "Doess",
            password: "pasarika mica",
            createdDate: '2024-02-10T12:41:33.460+00:00',
            __v: 0
        };

        (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockedData);

        const result = await FindUserByProp('email', 'example22@gmail.com');

        expect(result).toBe(mockedData);
        expect(result).toEqual(expect.objectContaining({ email: 'example22@gmail.com' }));
    });



    it('Will throw error if no params provided', async () => {
        await expect(FindUserByProp('','')).rejects.toThrow('Invalid argument');
        await expect(FindUserByProp('', 'example@gmail.com')).rejects.toThrow('Invalid argument');

    });
   
})