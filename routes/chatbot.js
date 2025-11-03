const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const chatbotController = require("../controllers/chatbot.js");

// This route will handle chat messages
// It doesn't require login, but the controller will handle guest/user chats
router.post("/", wrapAsync(chatbotController.handleChat));

module.exports = router;