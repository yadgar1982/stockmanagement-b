import {Schema,model} from "mongoose";
const currencySchema=new Schema({
  currency:{
    type:String,
      currency: { type: String, required: true, unique: true },
  },
  rate:{
    type:Number,
    required:true
  }

})

export default model("currency",currencySchema);