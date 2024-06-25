import mongoose from "mongoose";

export const dbConnection = ()=>{
  mongoose.connect(process.env.MONGO_URI,{
    dbName: "HOSPITAL_MANGEMENT_DEPLOYED"
  })
  .then(()=>{
    console.log("Connected to database");
  })
  .catch((err)=>{
    console.log(`some error occures while connecting to database: ${err}`);
  })
};