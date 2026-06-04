import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'token is not found',
      });
    }

    const verfiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verfiedToken) {
      return res.status(401).json({
        success: false,
        message: 'token is not verified',
      });
    }

    req.userId = verfiedToken.id;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `auth error ${error.message}`,
    });
  }
};

export default isAuth;
