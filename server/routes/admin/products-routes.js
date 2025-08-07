const express = require("express");
const { handleImageUpload } = require("../../controllers/admin/products-controller.js");
const { upload } = require("../../helpers/cloudinary.js");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

module.exports = router;
