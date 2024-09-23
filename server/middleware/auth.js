import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    // console.log(token,'skjbn')
    // Log the token and secret for debugging
    
    if (!token) {
      return res.status(403).send("Access-Denied");
    }
    
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // console.log("Token:", token);
    // console.log("Secret:", process.env.JWT_SECRET);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified token:::", verified);

    // Log the verification process

    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(500).json({ error: "Invalid Token" });
  }
};
