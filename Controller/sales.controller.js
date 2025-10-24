import saleModel from "../Model/sales.model.js";

//create sale
export const createSale = async (req, res) => {
  try {

    const data = req.body;
  
    const sale = await new saleModel(data).save();
    return res.status(200).json({
      message: "Sata submitted succesfully",
      data: sale,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//get all sale

export const getAllSale = async (req, res) => {
  try {
    const sales = await saleModel.find().sort({ _id: -1 });
    return res.status(200).json({ data: sales });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//delete sale
export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    await saleModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ msg: "sale record deleted sussessfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//update sale
export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;
    const sale = await saleModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!sale)
      return res.status(404).json({ msg: "Sale record not found" });

    return res
      .status(200)
      .json({ msg: "sSale record updated successfully", data: sale });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};
