import bcrypt from "bcryptjs";
import userSchema from "../Model/user.model.js";
import gravatar from "gravatar";

//create user
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    console.log("data data", data);
    const isUser = await userSchema.findOne({ email: data.email });
    if (isUser) {
      return res.status(400).json({ msg: "User already exist" });
    }

    // grabartar url
    const email = data.email;
    const avatar = gravatar.url(
      email,
      {
        s: "200",
        r: "pg",
        d: "mm",
      },
      true
    );

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password?.toString(), salt);
    const user = await new userSchema({
      ...data,
      password: hashedPassword,
      avatar,
    }).save();

    res.status(200).json({
      msg: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findByIdAndDelete(id);
    if (!user) {
      res.status(400).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete user", err });
  }
};
//delete user
export const deleteUserByEmail = async (req, res) => {
  try {
        const email = req.params.email;
    const user = await userSchema.findOneAndDelete({email});
    if (!user) {
      res.status(400).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete user", err });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

      if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    const user = await userSchema.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(200)
      .json({ msg: "User updated successfully", data: user });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update user", err });
  }
};
//update user
export const updateUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const updates = { ...req.body }; // copy to avoid mutation

    if (!email) return res.status(400).json({ msg: "Email is required" });
    if (!updates || Object.keys(updates).length === 0)
      return res.status(400).json({ msg: "No update data provided" });

    // Hash password if it's being updated
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updates.password, salt);
      updates.password = hashedPassword;
    }

    const user = await userSchema.findOneAndUpdate({ email }, updates, {
      new: true,
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res
      .status(200)
      .json({ msg: "User updated successfully", data: user });
  } catch (err) {
    console.error("err", err);
    return res.status(500).json({ msg: "Failed to update user", err });
  }
};

//get user by email

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) return res.status(400).json({ msg: "Email is required" });

    const user = await userSchema.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ msg: "user does not exist" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await userSchema.find().sort({ _id: -1 });
    res.status(200).json({ data: users });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

export const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await userSchema.findOne({ email });
    if (!user || !user.otp) {
      return res.status(400).json({ msg: "Invalid request" });
    }

    // OTP expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    // OTP check
    const isValidOtp = await bcrypt.compare(otp, user.otp);
    if (!isValidOtp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password + clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({
      msg: "Password reset successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Password reset failed" });
  }
};
