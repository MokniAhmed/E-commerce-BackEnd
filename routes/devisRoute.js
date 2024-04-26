const express = require("express");
const {
  createDevis,
  findAllDevis,
  findSpecificDevis,
  filterOrderForLoggedUser,
  updateDevisToCompleted,
  updateDevisItem,
  removeSpecificDevisItem,
  deleteSpecificDevis,
} = require("../services/devisService");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protect);

router.route("/").post(authMiddleware.allowedTo("user"), createDevis);
router.get(
  "/",
  authMiddleware.allowedTo("user", "admin", "manager"),
  filterOrderForLoggedUser,
  findAllDevis
);
router.get("/:id", findSpecificDevis);
router.delete(
  "/:id",
  authMiddleware.allowedTo("user", "admin", "manager"),
  deleteSpecificDevis
);

router.put(
  "/:id/completed",
  authMiddleware.allowedTo("admin", "manager"),
  updateDevisToCompleted
);

router
  .route("/:devisId/item/:itemId")
  .put(authMiddleware.allowedTo("admin", "manager"), updateDevisItem)
  .delete(
    authMiddleware.allowedTo("admin", "manager"),
    removeSpecificDevisItem
  );

module.exports = router;
