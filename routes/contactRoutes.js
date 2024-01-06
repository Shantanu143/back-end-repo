const express = require("express");
const router = express.Router();
const {
  getContact,
  getSingleContact,
  createContact,
  updateSingleContact,
  deleteSingleContact,
} = require("../controller/contactController.js");

//  all contacts
router.route("/").get(getContact).post(createContact);

// single contact
router
  .route("/:id")
  .get(getSingleContact)
  .put(updateSingleContact)
  .delete(deleteSingleContact);

module.exports = router;
