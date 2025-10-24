import Currency from "../Model/currency.model.js";

// Create currency
export const createCurrency = async (req, res) => {
  try {
    const data = req.body;

    const exists = await Currency.findOne({ currency: data.currency });
    if (exists) {
      return res.status(400).json({ msg: "Currency already exists" });
    }

    const currency = await new Currency(data).save();
    return res.status(200).json({
      msg: "Currency created successfully",
      currency,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Delete currency
export const deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await Currency.findByIdAndDelete(id);
    if (!currency) {
      return res.status(404).json({ msg: "Currency not found" });
    }
    return res.status(200).json({ msg: "Currency deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to delete currency", err });
  }
};

// Update currency
export const updateCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const currency = await Currency.findByIdAndUpdate(id, data, { new: true });
    if (!currency) {
      return res.status(404).json({ msg: "Currency not found" });
    }
    return res.status(200).json({ msg: "Currency updated successfully", data: currency });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to update currency", err });
  }
};

// Get all currencies
export const getAllCurrency = async (req, res) => {
  try {
    const currencies = await Currency.find().sort({ _id: -1 });
    return res.status(200).json({ data: currencies });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error: " + err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const currency = await Currency.findById(id);
     if (!currency) {
      return res.status(404).json({ msg: "Currency not found" });
    }
    res.status(200).json(currency);
  } catch (err) {
    res.status(500).json({ msg: "Currency does not exist" });
  }
};