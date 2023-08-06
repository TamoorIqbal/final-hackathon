import jwt from "jsonwebtoken";

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id },

    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  res.setHeader("Authorization", `Bearer ${token}`);
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

export default sendToken;
