import bcrypt, { genSalt } from "bcryptjs";
import categorySchema from "../Model/category.model.js";
import gravatar from "gravatar"

//create user
export const createCategory = async (req, res) => {
  try {
    const data = req.body;
    const isCategory = await categorySchema.findOne({ categoryName: data.categoryName });
    if (isCategory) {
      return res.status(400).json({ msg: "Category already exist" });
    }


    

    
    const category = await new categorySchema(data).save();

   res.status(200).json({
  msg: "Category created successfully",
  category,
});

  } catch (err) {
    console.error("Error in create",err)
    res.status(500).json({ msg: err.message });
  }
};

//delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categorySchema.findByIdAndDelete(id);
    if (!category) {
      res.status(400).json({ msg: "Category not found" });
    }
    return res.status(200).json({ msg: "Category Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete category", err });
  }
};

//update category
export const updateCategory=async(req,res)=>{
  try{
    const data=req.body;
    const { id } = req.params;
    const category=await categorySchema.findByIdAndUpdate(id,data,{new:true});
    if(!category){
      return res.status(404).json({msg:"Category not found"})
    }
   
    return res.status(200).json({msg:"Category updated successfully",data:category});
    
  }catch(err){
    console.error("error in update",err)
    res.status(500).json({msg:"Failed to update category",err})
  }
}

//get category by email

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categorySchema.findById(id);
     if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ msg: "Category does not exist" });
  }
};


export const getAllCategory=async(req,res)=>{
  try{
    const categorys= await categorySchema.find().sort({_id:-1});
    res.status(200).json({data:categorys})
  }catch(err){
     return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
}
