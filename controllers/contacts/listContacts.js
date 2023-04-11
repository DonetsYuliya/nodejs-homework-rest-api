const Contact = require("../../models/contactModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const listContacts = asyncHandler(async (req, res) => {
  const result = await Contact.find({});
  res
    .status(200)
    .json({ code: 200, message: "succes", result, qty: result.length });
});

module.exports = { listContacts: tryCatchWrapper(listContacts) };
