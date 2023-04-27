const Contact = require("../../models/contactModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const updateContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("the name field is required");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    return res.status(400).json({
      code: 400,
      message: `Contact with ${contactId} not found`,
    });
  }

  res.status(201).json({ code: 201, message: "succes", result });
});

module.exports = { updateContact: tryCatchWrapper(updateContact) };
