const express = require("express");
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../services/orderService");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/:cartId")
  .post(authMiddleware.allowedTo("user"), createCashOrder);
router.get(
  "/",
  authMiddleware.allowedTo("user", "admin", "manager"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get("/:id", findSpecificOrder);

router.put(
  "/:id/pay",
  authMiddleware.allowedTo("admin", "manager"),
  updateOrderToPaid
);
router.put(
  "/:id/deliver",
  authMiddleware.allowedTo("admin", "manager"),
  updateOrderToDelivered
);

module.exports = router;
