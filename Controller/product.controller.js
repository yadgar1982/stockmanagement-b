import bcrypt, { genSalt } from "bcryptjs";
import productSchema from "../Model/product.model.js";


//create user
export const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const isProduct = await productSchema.findOne({ productName: data.productName });
    if (isProduct) {
      return res.status(400).json({ msg: "Product already exist" });
    }
  const product = new productSchema(data).save();
   res.status(200).json({
  msg: "Product created successfully",
  product,
});

  } catch (err) {
    console.error("Error in create",err)
    res.status(500).json({ msg: err.message });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findByIdAndDelete(id);
    if (!product) {
      res.status(400).json({ msg: "Product not found" });
    }
    return res.status(200).json({ msg: "Product Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to delete product", err });
  }
};

//update product
export const updateProduct=async(req,res)=>{
  try{
    const data=req.body;
    const {id}=req.params;
    
    const product=await productSchema.findByIdAndUpdate(id,data,{new:true});
    if(!product){
      res.status(404).json({msg:"Product not found"})
    }
   
    return res.status(200).json({msg:"Product updated successfully",data:product});
    
  }catch(err){
    res.status(500).json({msg:"Failed to update product",err})
  }
}

//get product by email

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productSchema.findById(id);
     if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: "Product does not exist" });
  }
};


export const getAllProduct=async(req,res)=>{
  try{
    const products= await productSchema.find().sort({_id:-1});
    res.status(200).json({data:products})
  }catch(err){
     return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
}
