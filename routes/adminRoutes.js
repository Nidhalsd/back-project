
const router = require("express").Router();
const { login,addProduct, updateProduct, deleteProduct, getProductsByCategory } = require("../controllers/adminController");
const { adminMiddleware } = require("../middleware/adminMiddleware");

// Admin routes
router.post("/loginadmin", login);

// router.post("/addproduct", addProduct);
router.post("/addproduct", adminMiddleware, addProduct);


router.put("/updateproduct/:id", adminMiddleware, updateProduct);
router.delete("/deleteproduct/:id", adminMiddleware, deleteProduct);

router.get("/products/:category", getProductsByCategory);

module.exports = router;
