const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");


const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};



// ================================
// ✅ CRUD Controllers (to implement)
// ================================

// controllers/admin/products-controller.js
const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      image,           // 👈 include image
    } = req.body;

    const newlyCreatedProduct = new Product({
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      image,           // 👈 persist image
    });

    await newlyCreatedProduct.save();
    res.status(201).json({ success: true, data: newlyCreatedProduct });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error occured" });
  }
};


// ✅ Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      image,
    } = req.body;

    const findProduct = await Product.findById(id); // 👈 correct casing
    if (!findProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Only overwrite provided fields
    if (title !== undefined) findProduct.title = title;
    if (description !== undefined) findProduct.description = description;
    if (category !== undefined) findProduct.category = category;
    if (brand !== undefined) findProduct.brand = brand;
    if (price !== undefined) findProduct.price = price;
    if (salePrice !== undefined) findProduct.salePrice = salePrice;
    if (totalStock !== undefined) findProduct.totalStock = totalStock;
    if (image !== undefined) findProduct.image = image;

    await findProduct.save();
    res.status(200).json({ success: true, data: findProduct });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error occured" });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting the product",
    });
  }
};




module.exports = {
  handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct
};
