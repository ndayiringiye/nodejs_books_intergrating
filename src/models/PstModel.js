import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
    }
},{Timestamp:true});

export default mongoose.model("User", postSchema);