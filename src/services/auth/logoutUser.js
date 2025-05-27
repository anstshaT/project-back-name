
import { SessionsCollection } from '../db/models/Session.js';
import { ObjectId } from 'mongodb';

export const logoutUser = async (sessionId) => {
  try {
    await SessionsCollection.deleteOne({ _id: new ObjectId(sessionId) });
  } catch (err) {
    console.error(`Failed to delete session ${sessionId}:`, err);
    throw new Error('Logout failed');
  }
};
