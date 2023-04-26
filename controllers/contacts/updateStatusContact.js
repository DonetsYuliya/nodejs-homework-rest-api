const Contact = require("../../models/contactModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const updateStatusContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  console.log(favorite);
  if (favorite === "") {
    res.status(400);
    throw new Error("missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    return res.status(400).json({
      code: 400,
      message: `Contact with ${contactId} not found`,
    });
  }

  res.status(200).json({ code: 200, message: "succes", result });
});

module.exports = { updateStatusContact: tryCatchWrapper(updateStatusContact) };
