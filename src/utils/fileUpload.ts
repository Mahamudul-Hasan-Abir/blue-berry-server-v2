// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadOnCloudinary = async (localFilePath: string) => {
//   try {
//     if (!localFilePath) {
//       return null;
//     }
//     // Upload file in cloudinary

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     // file has been uploaded successfully
//     console.log("File is uploaded on cloudinary", response.url);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); //remove the locally ssaved temproray file as the upload operation got faild
//     return null;
//   }
// };
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Export as a function declaration
// function uploadOnCloudinary(localFilePath: string) {
//   return new Promise((resolve, reject) => {
//     try {
//       if (!localFilePath) {
//         resolve(null);
//         return;
//       }

//       // Upload file to cloudinary
//       cloudinary.uploader.upload(
//         localFilePath,
//         { resource_type: "auto" },
//         (error, result) => {
//           // Remove the locally saved temporary file
//           fs.unlinkSync(localFilePath);

//           if (error) {
//             console.error("Cloudinary upload error:", error);
//             resolve(null);
//             return;
//           }

//           // File has been uploaded successfully
//           console.log("File is uploaded on cloudinary", result.url);
//           resolve(result);
//         }
//       );
//     } catch (error) {
//       // In case of any error, remove the locally saved temporary file
//       fs.unlinkSync(localFilePath);
//       console.error("Error in uploadOnCloudinary:", error);
//       resolve(null);
//     }
//   });
// }

// // Export the function
// module.exports = { uploadOnCloudinary };
