import UsersCollection from '../../db/models/User.js';

export const updateUser = async (userId, payload, options = {}) => {
  const result = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  console.log('updateUser result', result.value);

  if (!result || !result.value) return null;

  return result.value;
};
