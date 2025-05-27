export const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.json({
    status: 200,
    message: 'User info fetched successfully',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    },
  });
};
