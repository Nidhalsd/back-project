const Product = require("../models/productSchema");
const Person = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");


// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, poster, category } = req.body; // Include category
    const newProduct = await Product.create({ name, description, price, poster, category });
    res.status(201).json({ msg: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong while adding product", error: error.message });
  }
};

// Get Products by Category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json({ msg: `Products for ${category} found`, products });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong while fetching products", error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ msg: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong while updating product", error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong while deleting product", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await Person.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "User does not exist. Try to register." });
    } else {
      const checkPw = await bcrypt.compare(password, userExist.password);
      if (!checkPw) {
        return res.status(404).json({ msg: "Password does not match. Please try again." });
      }

      const token = jwt.sign(
        { id: userExist._id, role: userExist.role }, 
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const roleMessage = userExist.role === "admin" ? "Admin login success" : "User login success";

      return res.status(201).json({
        msg: roleMessage,
        token: token,
        person: userExist,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong during login", error: error.message });
  }
};

module.exports = {login, addProduct, updateProduct, deleteProduct, getProductsByCategory };
