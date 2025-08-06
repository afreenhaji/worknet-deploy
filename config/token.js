import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },  // payload
      process.env.JWT_SECRET,
      { expiresIn: "7d" }  // token expiry
    );
    return token;
  } catch (error) {
    console.error("JWT Generation Error:", error);
    return null;
  }
};

export default genToken;
