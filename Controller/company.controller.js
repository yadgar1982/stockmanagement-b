import bcrypt, { genSalt } from "bcryptjs";
import companySchema from "../Model/company.model.js";
import gravatar from "gravatar"

//create user
export const createCompany = async (req, res) => {
  try {
    const data = req.body;
    const isCompany = await companySchema.findOne({ accountNo: data.accountNo });
    if (isCompany) {
      return res.status(400).json({ msg: "Company already exist" });
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
    const company = await new companySchema({
      ...data,
      password: hashedPassword,
      avatar,
    }).save();

   res.status(200).json({
  msg: "Company created successfully",
  company,
});

  } catch (err) {
    console.error("Error in create",err)
    res.status(500).json({ msg: err.message });
  }
};

//delete company
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await companySchema.findByIdAndDelete(id);
    if (!company) {
      res.status(400).json({ msg: "Company not found" });
    }
    return res.status(200).json({ msg: "Company Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete company", err });
  }
};

//update company
export const updateCompany=async(req,res)=>{
  try{
    const data=req.body;
    const {id}=req.params;
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(data.password?.toString(),salt)
    data.password=hashedPassword;
    const company=await companySchema.findByIdAndUpdate(id,data,{new:true});
    if(!company){
      res.status(404).json({msg:"Company not found"})
    }
   
    return res.status(200).json({msg:"Company updated successfully",data:company});
    
  }catch(err){
    res.status(500).json({msg:"Failed to update company",err})
  }
}

//get company by email

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await companySchema.findById(id);
     if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ msg: "Company does not exist" });
  }
};


export const getAllCompany=async(req,res)=>{
  try{
    const companys= await companySchema.find().sort({_id:-1});
    res.status(200).json({data:companys})
  }catch(err){
     return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
}
