const Contact = require("../../models/contactModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const removeContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    return res.status(400).json({
      code: 400,
      message: `Contact with ${contactId} not found`,
    });
  }

  res.json({ message: "deleting is successful", result });
});

module.exports = { removeContact: tryCatchWrapper(removeContact) };
