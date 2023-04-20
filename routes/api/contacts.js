const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts/index");

const authorization = require("../../middlewares/authorization");

router.get("/", authorization, listContacts);

router.get("/:contactId", authorization, getContactById);

router.post("/", authorization, addContact);

router.delete("/:contactId", authorization, removeContact);

router.put("/:contactId", authorization, updateContact);

router.patch("/:contactId/favorite", authorization, updateStatusContact);

module.exports = router;
