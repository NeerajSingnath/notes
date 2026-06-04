import UserModel from '../models/user.model.js';

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'user fetch successfully',
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `user fetch error ${error.message}`,
    });
  }
};
