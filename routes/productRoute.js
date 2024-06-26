const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../services/productService");
const authService = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    authService.protect,
    authService.allowedTo("admin", "equipeCom"),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    authService.allowedTo("admin", "equipeCom"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin", "equipeCom"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
