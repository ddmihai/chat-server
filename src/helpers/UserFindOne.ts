import User from "../models/user.model";

export const FindUserByProp = async (key: string, prop: string) => {
    try {
        if (key?.trim() === '' || prop?.trim() === '') {
            throw new Error('Invalid argument');
        }
        return await User.findOne({ key: prop });
    } 
    catch (error) {
        throw error;
    }
}