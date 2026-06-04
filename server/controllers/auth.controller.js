import UserModel from '../models/user.model.js';
import { getToken } from '../utils/token.js';

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        name,
        email,
        credits: 50,
        isCreditAvailable: true,
      });
    }
    const token = await getToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits,
        isCreditAvailable: user.isCreditAvailable,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `gooogle signup error ${error.message}`,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    await res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Logout successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `logout error ${error.message}`,
    });
  }
};
