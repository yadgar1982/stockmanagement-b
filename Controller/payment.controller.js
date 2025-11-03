import paymentModel from "../Model/payment.model.js";

//create Payment
export const createPayment = async (req, res) => {
  try {
    let data = req.body;
    console.log("Received paymentDate:", req.body.paymentDate);
    const payment = await new paymentModel(data).save();
    return res.status(200).json({
      message: "Payment saved successfully",
      data: payment,
    });
  } catch (err) {
    console.error(" Error creating payment:", err);
    return res
      .status(500)
      .json({ msg: "Internal Server Error: " + err.message });
  }
};
//get all Payment

export const getAllPayment = async (req, res) => {
  try {
    const payments = await paymentModel.find().sort({ _id: -1 });
    return res.status(200).json({ data: payments });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//delete Payment
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await paymentModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Payment record deleted sussessfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

//update Payment
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const payment = await paymentModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!payment)
      return res.status(404).json({ msg: "Payment record not found" });

    return res
      .status(200)
      .json({ msg: "sPayment record updated successfully", data: payment });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payments = await paymentModel.findById(id);
    return res.status(200).json({ data: payments });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
};
