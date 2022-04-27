const express = require("express");
const authController = require("../controllers/authController");
const { product, productOne, allProducts, updateProduct, deleteProduct } = require("../controllers/productControllers");//productControllers
const { inputProduct, getAllInputs, createInput, editInput, deletInput } = require("../controllers/inputController")//inputController
const { createProvider } = require("../controllers/providerController")//inputController

const authMiddleware = require("../middlewares/auth")

const router = express.Router();
// router.use(authMiddleware)
//routes userControllers
//registro de usuario...
router.post("/auth/register", authController.registerUser);

//login usuarios
router.post("/auth/authenticate", authController.authenticate);

//routes products
router.post("/product", authMiddleware, product);
router.get("/products/:product", authMiddleware, productOne);
router.get("/product/all", authMiddleware, allProducts);
router.put("/product/:id/update", authMiddleware, updateProduct);
router.delete("/product/:id/delete", authMiddleware, deleteProduct);

//routes inputs
router.post("/product/input", authMiddleware, inputProduct);
router.get("/product/getAllInputs", authMiddleware, getAllInputs);
router.put("/product/:input/createInput", authMiddleware, createInput);
router.put("/product/:input/editInput", authMiddleware, editInput);
router.delete("/product/:input/deleteInput", authMiddleware, deletInput);

//routes providers
router.post("/provider", authMiddleware, createProvider);

module.exports = router;