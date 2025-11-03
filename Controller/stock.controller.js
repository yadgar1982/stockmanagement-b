import bcrypt from "bcryptjs";
import stockSchema from "../Model/stock.model.js";
import gravatar from "gravatar"

//create user
export const creatStock = async (req, res) => {
  try {
    const data = req.body;

    const isStock = await stockSchema.findOne({stockName: data.stockName });
    if (isStock) {
      return res.status(400).json({ msg: "Stock already exist" });
    }
  const stock= await stockSchema(data).save();

   res.status(200).json({
  msg: "Stock created successfully",
  stock,
});

  } catch (err) {
    console.error("Error in create",err)
    res.status(500).json({ msg: err.message });
  }
};

//delete stock
export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

      const stock = await stockSchema.findByIdAndDelete(id);
    if (!stock) {
      res.status(400).json({ msg: "Stock not found" });
    }
    return res.status(200).json({ msg: "Stock Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Sailed to Delete stock", err });
  }
};

//update stock
export const updateStock=async(req,res)=>{
  try{
    const data=req.body;
    const {id}=req.params;
     
    const stock=await stockSchema.findByIdAndUpdate(id,data,{new:true});
    if(!stock){
      res.status(404).json({msg:"Stock not found"})
    }
   
    return res.status(200).json({msg:"Stock updated successfully",data:stock});
    
  }catch(err){
    res.status(500).json({msg:"Failed to update stock",err})
  }
}


export const getAllStock=async(req,res)=>{
  try{
    const stocks= await stockSchema.find().sort({_id:-1});
    res.status(200).json({data:stocks})
  }catch(err){
     return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
}

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const stock = await stockSchema.findById(id);
     if (!stock) {
      return res.status(404).json({ msg: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ msg: "Stock does not exist" });
  }
};