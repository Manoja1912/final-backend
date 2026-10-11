const express = require("express");
const router = express.Router();
const { protect } = require("../middlewear/auth");
const controller = require("../controllers/productController");

router.get("/", controller.getProducts);

router.get("/:id", controller.getProduct);

router.post("/", protect, controller.createProduct);

router.put("/:id", protect, controller.updateProduct);

router.delete("/:id", protect, controller.deleteProduct);

module.exports = router;