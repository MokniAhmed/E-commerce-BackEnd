const express = require("express");

const authService = require("../middlewares/authMiddleware");

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
} = require("../services/contactService");

const router = express.Router();

router
  .route("/")
  .get(
    authService.protect,
    authService.allowedTo("admin", "equipeCom"),
    getContacts
  )
  .post(createContact);
router
  .route("/:id")
  .get(
    authService.protect,
    authService.allowedTo("admin", "equipeCom"),
    getContact
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin", "equipeCom"),
    deleteContact
  );

module.exports = router;
