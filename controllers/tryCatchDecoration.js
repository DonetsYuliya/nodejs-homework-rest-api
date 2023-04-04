const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const schemaValidation = require("./schemaValidation");
const addSchema = require("../schemas/joiSchema");
const tryCatchWrapper = require("../utils/tryCatchWrapper");

const getAll = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw Error(`Contact '${contactId}' is not found`);
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const data = req.body;
  const body = await schemaValidation(addSchema, data);
  const result = await addContact(body);
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw Error(`Contact '${contactId}' is not found`);
  }
  res.json({ message: "deleting is successful", result });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const body = await schemaValidation(addSchema, data);
  const result = await updateContact(contactId, body);
  if (!result) {
    throw Error(`Contact '${contactId}' is not found`);
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: tryCatchWrapper(getAll),
  getContactById: tryCatchWrapper(getById),
  removeContact: tryCatchWrapper(remove),
  addContact: tryCatchWrapper(add),
  updateContact: tryCatchWrapper(update),
};
