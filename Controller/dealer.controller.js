import bcrypt from "bcryptjs";
import dealerSchema from "../Model/dealer.model.js";
import gravatar from "gravatar";

//create Dealer
export const createDealer = async (req, res) => {
  try {
    const data = req.body;
    console.log("data data", data);
    const isDealer = await dealerSchema.findOne({
      accountNo: data.accountNo,
    });
    if (isDealer) {
      return res.status(400).json({ msg: "Dealer already exist" });
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
    const dealer = await new dealerSchema({
      ...data,
      password: hashedPassword,
      avatar,
    }).save();

    res.status(200).json({
      msg: "Dealer created successfully",
      dealer,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//delete dealer
export const deleteDealer = async (req, res) => {
  try {
    const { id } = req.params;

    const dealer = await dealerSchema.findByIdAndDelete(id);
    if (!dealer) {
      res.status(400).json({ msg: "Dealer not found" });
    }
    return res.status(200).json({ msg: "Dealer Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete dealer", err });
  }
};

//update dealer
export const updateDealer = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password?.toString(), salt);
    data.password = hashedPassword;
    const dealer = await dealerSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!dealer) {
      res.status(404).json({ msg: "Dealer not found" });
    }

    return res
      .status(200)
      .json({ msg: "Dealer updated successfully", data: dealer });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update dealer", err });
  }
};

//update dealer without passsword
export const updateMyDealer = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Never allow password update here
    delete data.password;

    const dealer = await dealerSchema.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!dealer) {
      return res.status(404).json({ msg: "Dealer not found" });
    }

    return res.status(200).json({
      msg: "Dealer updated successfully",
      data: dealer,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Failed to update dealer", err });
  }
};

//get user by email

export const getDealerByEmail = async (req, res) => {
  try {
    const email = req.body;
    const dealer = await dealerSchema.findOne(email);
    return dealer;
  } catch (err) {
    res.status(500).json({ msg: "Dealer does not exist" });
  }
};

export const getAllDealer = async (req, res) => {
  try {
    const dealer = await dealerSchema.find().sort({ _id: -1 });
    res.status(200).json({ data: dealer });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const dealer = await dealerSchema.findById(id);
     if (!dealer) {
      return res.status(404).json({ msg: "Dealer not found" });
    }
    res.status(200).json(dealer);
  } catch (err) {
    res.status(500).json({ msg: "Dealer does not exist" });
  }
};