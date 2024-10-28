const Person = require("../models/userSchema");
const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");



const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    const newUser = await Person.findOne({ email });

    if (newUser)
      return res.status(400).json({ msg: "user exist try to login" });
    else {
      const hashedPW = await bcrypt.hash(password, 10);
      const createUser = await Person.create({
        name,
        email,
        password: hashedPW,
      });
      const token = jwt.sign({ id: createUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res
        .status(201)
        .json({ msg: "user created", token: token, person: createUser });
    }
  } catch(error) {
    res.status(500).json({ msg: "somthing went wrong", error: error.message });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await Person.findOne({ email });
    if (!userExist)
      res.status(400).json({ msg: "user does not exist try to register" });
    else {
      const checkPw = await bcrypt.compare(password, userExist.password);
      if (!checkPw)
        res
          .status(404)
          .json({ msg: "password does not match please try again " });
      const token = jwt.sign(
        { id: userExist._id, role: userExist.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res
        .status(201)
        .json({ msg: "login success", token: token, person: userExist });
    }
  } catch(error) {
    res.status(500).json({ msg: "somthing went wrong", error: error.message });
  }
};



const getUSerData = async (req, res) => {
  try {
    const user = await Person.findOne({ _id: req.personId });
    if (!user)
      res.status(400).json({ msg: "user does not exist try to register" });
    res.status(200).json({ msg: "user info success", person: user });
  } catch (error) {
    res.status(500).json({ msg: "somthing went wrong", error: error.message });
  }
};



const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({ msg: "Get all products", products });
  } catch (error) {
    res.status(500).json({ msg: "somthing went wrong /getProducts" });
  }
};



const createOrder = async (req, res) => {
  try {
    const { userId, productList } = req.body;
    const newOrder = await Order.create({
      products: productList,
      owner,
      userId,
    });
    res.status(201).json({ msg: "send orders", newOrder });
  } catch (error) {
    res.status(500).json({ msg: "somthing went wrong /createOrder" });
  }
};



const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const userOrder = await Order.find({ owner, userId });
    res.status(201).json({ msg: "Get all user Orders", userOrder });
  } catch (error) {
    res.status(500).json({ msg: "somthing went wrong /getUserOrders" });
  }
};



module.exports = {
  register,
  login,
  getUSerData,
  getProduct,
  createOrder,
  getUserOrders,
};