const Contact = require("../models/Contact");

/**
 * Save a new contact message to the database
 * @param {Object} data - { name, email, message }
 * @returns {Promise<Object>} - Created contact document
 */
const submitMessage = async (data) => {
    const contact = await Contact.create(data);
    return contact;
};

/**
 * Get all contact messages, sorted by newest first
 * @returns {Promise<Array>} - List of contact messages
 */
const getAllMessages = async () => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return contacts;
};

module.exports = {
    submitMessage,
    getAllMessages,
};
