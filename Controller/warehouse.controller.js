import WareHouseSchema from "../Model/warehouse.model.js";
//create warehouseProduct
export const createWareHouseProduct = async (req, res) => {
  try {
    const data = req.body;
    const warehouseProduct = await new WareHouseSchema(data).save();
    return res.status(200).json({
      message: "data submitted succesfully",
      data: warehouseProduct,
    });
  } catch (err) {

    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//get all warehouseProduct

export const getAllWarehouseProducts = async (req, res) => {
  try {
    const warehouseProducts = await WareHouseSchema.find().sort({ _id: -1 });
    return res.status(200).json({ data: warehouseProducts });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};
export const getWarehouseProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const warehouseProducts = await WareHouseSchema.findById(id);
    return res.status(200).json({ data: warehouseProducts });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//delete warehouseProduct
export const deleteWarehouseProduct = async (req, res) => {
  try {
    // const id = req.params.id;
    // await WareHouseSchema.findByIdAndDelete(id);
    const transactionId = req.params.id;
await WareHouseSchema.findOneAndDelete({ transactionId });

    return res
      .status(200)
      .json({ msg: " Record deleted sussessfully" });
  } catch (err) {
    
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//update by id
// export const updateById = async (req, res) => {
//    try {
//     const id = req.params.id;
  
//     const updateData = req.body; // take whole body
    
//     const warehouseProduct = await WareHouseSchema.updateMany(
//   { transactionId: id },
//   { $set: { ...updateData, _id: undefined } }, // _id won't be updated
//   { new: true }
// );

//     if (!warehouseProduct)
//       return res.status(404).json({ msg: "Record not found" });

//     return res.status(200).json({
//       msg: "Record updated successfully",
//       data: warehouseProduct
//     });
//   } catch (err) {
//     console.log("err",err)
//     return res.status(500).json({ msg: "Internal Server Error" + err.message });
//   }
// };

export const updateById = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { _id, transactionType, ...updateData } = req.body; // 🔥 strip _id

    if (!transactionType) {
      return res.status(400).json({ msg: "transactionType is required" });
    }

    const warehouseProduct = await WareHouseSchema.findOneAndUpdate(
      { transactionId, transactionType },
      { $set: updateData },
      { new: true }
    );

    if (!warehouseProduct) {
      return res.status(404).json({
        msg: "Record not found",
        transactionId,
        transactionType
      });
    }

    return res.status(200).json({
      msg: "Record updated successfully",
      data: warehouseProduct
    });
  } catch (err) {
    console.error("err", err);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: err.message
    });
  }
};


//update warehouseProduct
export const updateWarehouseProduct = async (req, res) => {
  try {
    const transactionId = req.params.id;
    console.log("tranasction",transactionId)
    const {_id,...data} = req.body;
    const warehouseProduct = await WareHouseSchema.findOneAndUpdate({transactionId}, data, {
      new: true,
    });
    if (!warehouseProduct)
      return res.status(404).json({ msg: " Record not found" });

    return res
      .status(200)
      .json({ msg: " Record updated successfully", data: warehouseProduct });
  } catch (err) {
    console.log("err",err)
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};