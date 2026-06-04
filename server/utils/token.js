import jwt from 'jsonwebtoken';

export const getToken = async (userId) => {
  try {
    // Wrap userId in a plain object: { id: userId }
    const jwtToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return jwtToken;
  } catch (error) {
    console.log(error);
  }
};
