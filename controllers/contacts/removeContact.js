const Contact = require("../../models/contactModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const removeContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  res.json({ message: "deleting is successful", result });
});

module.exports = { removeContact: tryCatchWrapper(removeContact) };
