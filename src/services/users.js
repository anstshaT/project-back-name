import UsersCollection from "../db/models/User"

export const getUserById = async(userId) => {
    const user = await UsersCollection.findById(userId);
    return user;
};