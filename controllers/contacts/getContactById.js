const Contact = require("../../models/contactModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const getContactById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

  res.status(200).json({ code: 200, message: "succes", result });
});

module.exports = { getContactById: tryCatchWrapper(getContactById) };
