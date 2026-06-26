import userModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email",email,password)
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and Password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: " Invalid Credentials" });
    }

    const payload = {
      email: user.email,
      role:user.role,
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: "2h",
    });
    res.status(200).json({
      message: "Login successfull",
      token,
      user: user,
    });
  } catch (err) {
    console.log("Wrong credentials", err);
  }
};
