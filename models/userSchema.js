import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
    minLength: [3,"Last Name Must Contain At least 3 Characters"]
  }, 
  lastName:{
    type: String,
    required: true,
    minLength: [3,"Last Name Must Contain At least 3 Characters"]
  }, 
  email:{
    type: String,
    required: true,
    validate: [validator.isEmail,"Please provide a valid Email"]
  }, 
  phone:{
    type: String,
    required: true,
    minLength: [10,"Phone Number must contains 10 digits!"],
    maxLength: [10,"Phone Number must contains 10 digits!"],
  }, 
  nic:{
    type: String,
    required: true,
    minLength: [13,"NIC Must Contain At least 13 Digits!"],
    maxLength: [13,"NIC Number must contains 13 Digits!"],
  }, 
  dob:{
    type: String,
    required: [true, "DOB is required!"],
  },
  gender:{
    type: String,
    required: true,
    enum: ["Male", "Female", "Others"],
  },
  password:{
    type: String,
    minLength: [8, "Password Must Contains Atleast 4 Charcters!"],
    required: true,
    select: false,
  },
  role:{
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment:{
    type: String,
  },
  docAvatar: {
    public_id: String,
    url : String,
  },

});

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword= async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.
    JWT_EXPIRES,
  });
};

export const User=mongoose.model("User",userSchema);