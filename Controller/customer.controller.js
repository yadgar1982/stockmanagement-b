import bcrypt, { genSalt } from "bcryptjs";
import customerSchema from "../Model/customer.model.js";
import gravatar from "gravatar"

//create user
export const createCustomer = async (req, res) => {
  try {
    const data = req.body;
    console.log("data data", data);
    const isCustomer = await customerSchema.findOne({ accountNo: data.accountNo });
    if (isCustomer) {
      return res.status(400).json({ msg: "Customer already exist" });
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
    const customer = await new customerSchema({
      ...data,
      password: hashedPassword,
      avatar,
    }).save();

   res.status(200).json({
  msg: "Customer created successfully",
  customer,
});

  } catch (err) {
    console.error("Error in create",err)
    res.status(500).json({ msg: err.message });
  }
};

//delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id)
    const customer = await customerSchema.findByIdAndDelete(id);
    if (!customer) {
      res.status(400).json({ msg: "Customer not found" });
    }
    return res.status(200).json({ msg: "Customer Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete customer", err });
  }
};

//update customer
export const updateCustomer=async(req,res)=>{
  try{
    const data=req.body;
    const {id}=req.params;
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(data.password?.toString(),salt)
    data.password=hashedPassword;
    const customer=await customerSchema.findByIdAndUpdate(id,data,{new:true});
    if(!customer){
      res.status(404).json({msg:"Customer not found"})
    }
   
    return res.status(200).json({msg:"Customer updated successfully",data:customer});
    
  }catch(err){
    res.status(500).json({msg:"Failed to update Customer",err})
  }
}

//get customer by email

export const getCustomerByMail = async (req, res) => {
  try {
    const email = req.body;
    const customer = await customerSchema.findOne(email);
    return customer;
  } catch (err) {
    res.status(500).json({ msg: "customer does not exist" });
  }
};


export const getAllCustomer=async(req,res)=>{
  try{
    const customers= await customerSchema.find().sort({_id:-1});
    res.status(200).json({data:customers})
  }catch(err){
     return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
}


export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await customerSchema.findById(id);
     if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ msg: "Customer does not exist" });
  }
};