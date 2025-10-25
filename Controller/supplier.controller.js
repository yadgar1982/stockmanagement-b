import bcrypt from "bcryptjs";
import supplierSchema from "../Model/supplier.model.js"
import gravatar from "gravatar"

//create user
export const createSupplier = async (req, res) => {
  try {
    const data = req.body;
    console.log("data data", data);
    const isSupplier = await supplierSchema.findOne({ accountNo: data.accountNo });
    if (isSupplier) {
      return res.status(400).json({ msg: "Supplier already exist" });
    }


    // grabartar url
    const email=data.email;
    const avatar=gravatar.url(email,{
      s:"200",
      r:"pg",
      d:"mm"
    },true);

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password?.toString(), salt);
    const supplier = await new supplierSchema({
      ...data,
      password: hashedPassword,
      avatar,
      transactions: [],
    }).save();

   res.status(200).json({
  msg: "Supplier created successfully",
  supplier,
});

  } catch (err) {
    console.error("Error in create",err)
    res.status(500).json({ msg: err.message });
  }
};

//delete supplier
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id)
      const supplier = await supplierSchema.findByIdAndDelete(id);
    if (!supplier) {
      res.status(400).json({ msg: "Supplier not found" });
    }
    return res.status(200).json({ msg: "Supplier Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete supplier", err });
  }
};

//update supplier
export const updateSupplier=async(req,res)=>{
  try{
    const data=req.body;
    const {id}=req.params;
      //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password?.toString(), salt);
    data.password= hashedPassword
    const supplier=await supplierSchema.findByIdAndUpdate(id,data,{new:true});
    if(!supplier){
      res.status(404).json({msg:"Supplier not found"})
    }
   
    return res.status(200).json({msg:"Supplier updated successfully",data:supplier});
    
  }catch(err){
    res.status(500).json({msg:"Failed to update supplier",err})
  }
}

//update supplier


export const addTransactionToSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = req.body;

    // Find supplier by ID
    const supplier = await supplierSchema.findById(id);
    if (!supplier) return res.status(404).json({ msg: "Supplier not found" });


    if (!supplier.transaction) supplier.transaction = [];

    supplier.transaction.push(transaction);

    // Save the updated supplier
    await supplier.save();

    res.status(200).json({
      msg: "Transaction added successfully",
      data: supplier,
    });
  } catch (err) {
    console.error("Backend error adding transaction:", err);
    res.status(500).json({
      msg: "Failed to add transaction",
      error: err.message, // send readable error
    });
  }
};


//get user by email

export const getSupplierByEmail = async (req, res) => {
  try {
    const email = req.body;
    const supplier = await supplierSchema.findOne(email);
    return supplier;
  } catch (err) {
    res.status(500).json({ msg: "Supplier does not exist" });
  }
};


export const getAllSupplier=async(req,res)=>{
  try{
    const users= await supplierSchema.find().sort({_id:-1});
    res.status(200).json({data:users})
  }catch(err){
     return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
}

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await supplierSchema.findById(id);
     if (!supplier) {
      return res.status(404).json({ msg: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ msg: "Supplier does not exist" });
  }
};