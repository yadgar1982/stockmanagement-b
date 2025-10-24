import PurchaseModel from "../Model/purchase.model.js";
import UserModel from "../Model/user.model.js";
//create purchase
export const createPurchase = async (req, res) => {
  try {

    const data = req.body;
    console.log(data);
   
    const purchase = await new PurchaseModel(data).save();
    return res.status(200).json({
      message: "data submitted succesfully",
      data: purchase,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//get all purchase

export const getAllPurchase = async (req, res) => {
  try {
    const purchases = await PurchaseModel.find().sort({ _id: -1 });
    return res.status(200).json({ data: purchases });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//delete purchase
export const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    await PurchaseModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ msg: "Purchase record deleted sussessfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//update purchase
export const updatePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id from param", id);
    const data = req.body;
    const purchase = await PurchaseModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!purchase)
      return res.status(404).json({ msg: "Purchase record not found" });

    return res
      .status(200)
      .json({ msg: "Purchase record updated successfully", data: purchase });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};
