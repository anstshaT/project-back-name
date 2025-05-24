import bcrypt from 'bcryptjs';
import User from '../../db/models/User.js';

export const registerUser = async ({ name, email, password, balance }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    balance: balance || '0',
  });

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    balance: newUser.balance,
  };
};
