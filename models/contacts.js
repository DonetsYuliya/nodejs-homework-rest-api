const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data.toString());
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  const newList = JSON.stringify(data, null, 2);
  await writeFile(contactsPath, newList);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const result = [...data, newContact];
  const newList = JSON.stringify(result, null, 2);
  await writeFile(contactsPath, newList);
  return result;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex(({ id }) => contactId === id);
  if (index === -1) {
    return null;
  }
  data[index] = { id: contactId, ...body };
  const newList = JSON.stringify(data, null, 2);
  await writeFile(contactsPath, newList);
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
