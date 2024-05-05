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
  authMiddleware.allowedTo("user", "admin", "equipeCom"),
  filterOrderForLoggedUser,
  findAllDevis
);
router.get("/:id", findSpecificDevis);
router.delete(
  "/:id",
  authMiddleware.allowedTo("user", "admin", "equipeCom"),
  deleteSpecificDevis
);

router.put(
  "/:id/completed",
  authMiddleware.allowedTo("admin", "equipeCom"),
  updateDevisToCompleted
);

router
  .route("/:devisId/item/:itemId")
  .put(authMiddleware.allowedTo("admin", "equipeCom"), updateDevisItem)
  .delete(
    authMiddleware.allowedTo("admin", "equipeCom"),
    removeSpecificDevisItem
  );

module.exports = router;
