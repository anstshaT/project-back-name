import { SessionCollection } from '../../db/models/Session.js';

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};
