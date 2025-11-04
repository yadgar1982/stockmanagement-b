import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
     const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json({ msg: "Unauthorized. Token missing" });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWTSECRET);
    res.user = decoded;
    next();

  } catch (err) {
   console.error("Token verification failed:", err);
    return res.status(401).json({ msg: "Unauthorized. Invalid token" });
  }
};

//allow only Admin
export const isAdmin = (req, res, next) => {

  if (res.user?.role  !== "admin") {
    console.log("role", req.uer.role);
    return res.status(400).json({ msg: "Access denied: Not authorized" });
  }
  next();
};
