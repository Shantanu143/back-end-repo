const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");
// @desc GET app contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
  // res.status(200).json({ message: "get all contact" });
});

// @desc GET  single app contacts
// @route GET /api/contacts/:id
// @access public
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
  // res.status(200).json({ message: `Get contact ${req.params.id}` });
});

// @desc POST app contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, phone, email } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

// @desc UPDATE app contacts
// @route UPDATE /api/contacts/:id
// @access public
const updateSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});
// @route DELETE /api/contacts/:id
// @access public
const deleteSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  await Contact.remove();
  res.status(200).json(contact);
});
module.exports = {
  getContact,
  getSingleContact,
  createContact,
  updateSingleContact,
  deleteSingleContact,
};
