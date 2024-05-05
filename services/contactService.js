const factory = require("./handlersFactory");

const Contact = require("../models/contactModel");

// @desc    Get list of Contacts
// @route   GET /api/v1/Contacts
// @access  Private
exports.getContacts = factory.getAll(Contact);

// @desc    Get specific Contact by id
// @route   GET /api/v1/Contacts/:id
// @access  Private
exports.getContact = factory.getOne(Contact);

// @desc    Create Contact
// @route   POST  /api/v1/Contacts
// @access  Public
exports.createContact = factory.createOne(Contact);

// @desc    Delete specific Contact
// @route   DELETE /api/v1/Contacts/:id
// @access  Private
exports.deleteContact = factory.deleteOne(Contact);
