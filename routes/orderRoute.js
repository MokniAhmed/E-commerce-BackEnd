const express = require("express");
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteSpecificOrder,
} = require("../services/orderService");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/:devisId")
  .post(authMiddleware.allowedTo("user"), createCashOrder);
router.get(
  "/",
  authMiddleware.allowedTo("user", "admin", "manager"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get("/:id", findSpecificOrder);
router.delete("/:id", deleteSpecificOrder);

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
