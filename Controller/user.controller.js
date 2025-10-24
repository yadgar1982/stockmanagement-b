import bcrypt from "bcryptjs";
import userSchema from "../Model/user.model.js";
import gravatar from "gravatar"

//create user
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    console.log("data data", data);
    const isUser = await userSchema.findOne({ email: data.email });
    if (isUser) {
      return res.status(400).json({ msg: "User already exist" });
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
    const user = await new userSchema({
      ...data,
      password: hashedPassword,
      avatar,
    }).save();

   res.status(200).json({
  msg: "User created successfully",
  user,
});

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id)
    const user = await userSchema.findByIdAndDelete(id);
    if (!user) {
      res.status(400).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete user", err });
  }
};

//update user
export const updateUser=async(req,res)=>{
  try{
    const data=req.body;
    const {id}=req.params;
    const user=await userSchema.findByIdAndUpdate(id,data,{new:true});
    if(!user){
      res.status(404).json({msg:"User not found"})
    }
   
    return res.status(200).json({msg:"User updated successfully",data:user});
    
  }catch(err){
    res.status(500).json({msg:"Failed to update user",err})
  }
}

//get user by email

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.body;
    const user = await userSchema.findOne(email);
    return user;
  } catch (err) {
    res.status(500).json({ msg: "user does not exist" });
  }
};


export const getAllUser=async(req,res)=>{
  try{
    const users= await userSchema.find().sort({_id:-1});
    res.status(200).json({data:users})
  }catch(err){
     return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
}
