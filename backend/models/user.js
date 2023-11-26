import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    ceo:String,
    startup:String,
    email:String
},{timestamps:true})

export default mongoose.model('user',userSchema)