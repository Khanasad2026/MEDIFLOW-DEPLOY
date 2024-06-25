import app from "./app.js";
import cloudinary from "cloudinary"

cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME1,
  api_key:process.env.CLOUDINARY_API_KEY1,
  api_secret:process.env.
  CLOUDINARY_API_SECRET1,
  
})

app.listen(process.env.PORT,()=>{
  console.log(`Server listning on port ${process.env.PORT}`);
});
