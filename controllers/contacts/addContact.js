const Contact = require("../../models/contactModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const addContact = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json({ code: 201, message: "succes", result });
});

module.exports = { addContact: tryCatchWrapper(addContact) };
