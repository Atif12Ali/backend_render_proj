const contactService = require("../services/contactService");

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    try {
        console.log("Received contact form submission:", req.body);
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        const contact = await contactService.submitMessage({ name, email, message });

        res.status(201).json({
            success: true,
            data: contact,
            message: "Message sent successfully",
        });
    } catch (error) {
        console.error("Error submitting contact:", error);
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res) => {
    try {
        const contacts = await contactService.getAllMessages();
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    submitContact,
    getContacts,
};
