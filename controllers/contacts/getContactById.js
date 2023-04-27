const Contact = require("../../models/contactModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const getContactById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    return res.status(400).json({
      code: 400,
      message: `Contact with ${contactId} not found`,
    });
  }

  res.status(200).json({ code: 200, message: "succes", result });
});

module.exports = { getContactById: tryCatchWrapper(getContactById) };
