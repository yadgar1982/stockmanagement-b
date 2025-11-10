import brandingModel from "../Model/branding.model.js"
import fs from "fs";
import path from "path";
//create user
export const createBranding = async (req, res) => {
  try {
    const data = req.body;
    const isBranding = await brandingModel.findOne({ email: data.email });
    if (isBranding) {
      return res.status(400).json({ msg: "Brand already exist" });
    }

      //save logo path if file was uploaded
      const logoPath = req.file ? `/uploads/${req.file.filename}` : null;
  
    const branding = await new brandingModel({
      ...data,
      logo:logoPath,
    }).save();

   res.status(200).json({
  msg: "Brand created successfully",
  branding,
});

  } catch (err) {
    console.error("Error in create",err)
    res.status(500).json({ msg: err.message });
  }
};

//delete branding
export const deleteBranding = async (req, res) => {
  try {
    const { id } = req.params;
      const branding = await brandingModel.findById(id);
    if (!branding) {
      return res.status(404).json({ msg: "Branding not found" });
    }
     if (branding.logo) {
       const logoPath = path.resolve(`.${branding.logo}`); // resolve relative to project root
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }
    await brandingModel.findByIdAndDelete(id);
    if (!branding) {
      res.status(400).json({ msg: "Branding not found" });
    }
    return res.status(200).json({ msg: "branding Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "failed to Delete branding", err });
  }
};

//update company


export const updateBranding = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Find the existing branding document
    const branding = await brandingModel.findById(id);
    if (!branding) {
      return res.status(404).json({ msg: "Branding not found" });
    }

    // Handle new logo upload
    let updatedLogoPath = branding.logo; // keep old logo by default
    if (req.file) {
      // Delete old logo file if exists
      if (branding.logo) {
        const oldPath = path.resolve(`.${branding.logo}`);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      // Set new logo path
      updatedLogoPath = `/uploads/${req.file.filename}`;
    }

    // Update branding document
    const updatedBranding = await brandingModel.findByIdAndUpdate(
      id,
      { ...data, logo: updatedLogoPath },
      { new: true }
    );

    res.status(200).json({
      msg: "Branding updated successfully",
      branding: updatedBranding,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Failed to update branding", err });
  }
};

//get branding by email

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const branding = await brandingModel.findById(id);
     if (!branding) {
      return res.status(404).json({ msg: "Branding not found" });
    }
    res.status(200).json(branding);
  } catch (err) {
    res.status(500).json({ msg: "Branding does not exist" });
  }
};


export const getAllBranding=async(req,res)=>{
  try{
    const brandings= await brandingModel.find().sort({_id:-1});
    res.status(200).json({data:brandings})
  }catch(err){
     return res.status(500).json({ msg: "Internal Server Error" + err.message });
  }
}
