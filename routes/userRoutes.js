const router = require("express").Router();
const {register,login,getProduct,getUSerData,createOrder,getUserOrders} = require("../controllers/userController")
const {authMiddleware}=require("../middleware/authMiddleware")
const { getProductsByCategory } = require("../controllers/adminController"); 

const {check} = require("express-validator")


router.post("/register", register)
router.post("/login", login)
router.get("/",authMiddleware,  getUSerData)
router.get("/getproducts", getProduct)
router.post("/createorder",authMiddleware, createOrder)
router.post("/getuserorders",authMiddleware, getUserOrders)

router.get("/products/:category", getProductsByCategory);


module.exports=router

