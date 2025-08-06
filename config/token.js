import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }  // Optional but recommended
    );
    return token;
  } catch (error) {
    console.error("JWT Token Generation Failed:", error);
    throw error;  // Better to throw so caller can handle it
  }
};

export default genToken;
