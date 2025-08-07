const cloudinary = require ("cloudinary").v2;
const multer = require("multer");

cloudinary.config({

    cloud_name:"dcca89ody",
    api_key:"953223737728196",
    api_secret:"Bg9JJiv3-JFUHNO-2N4X2h6u7uA",

});



const storage = new multer.memoryStorage();

async function ImageUploadUtils(file) {

    const result = await cloudinary.uploader.upload(file, {
        ressource_type : "auto",

    });
     return result;

}

     const upload = multer({storage});

    module.exports = {upload, handleImageUpload };
