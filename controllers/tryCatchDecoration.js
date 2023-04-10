const Contact = require("../models/contactModel");

const { tryCatchWrapper } = require("../utils/index");
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res) => {
  const result = await Contact.find({});
  res
    .status(200)
    .json({ code: 200, message: "succes", result, qty: result.length });
});

const getById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

  res.status(200).json({ code: 200, message: "succes", result });
});

const add = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
  }
  const result = await Contact.create({ ...req.body });

  res.status(201).json({ code: 201, message: "succes", result });
});

const remove = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  res.json({ message: "deleting is successful", result });
});

const update = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("the name field is required");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.status(201).json({ code: 201, message: "succes", result });
});

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    res.status(400);
    throw new Error("missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(contactId, favorite, {
    new: true,
  });

  res.status(200).json({ code: 200, message: "succes", result });
};

module.exports = {
  listContacts: tryCatchWrapper(getAll),
  getContactById: tryCatchWrapper(getById),
  removeContact: tryCatchWrapper(remove),
  addContact: tryCatchWrapper(add),
  updateContact: tryCatchWrapper(update),
  updateStatusContact: tryCatchWrapper(updateStatus),
};
