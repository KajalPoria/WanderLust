const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

// A simple in-memory chat history (for demonstration)
// For a production app, you might store this in the user's session or a database
const chatHistory = {};

module.exports.handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user ? req.user._id.toString() : 'guest';

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Initialize history for user if it doesn't exist
        if (!chatHistory[userId]) {
            chatHistory[userId] = [
                {
                    role: "user",
                    parts: [{ text: "You are a helpful travel assistant for a website called WanderLust. You specialize in recommending travel destinations, explaining listing details, and answering user questions about travel. Be friendly, concise, and helpful." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! I'm your WanderLust travel assistant. How can I help you plan your next adventure today?" }],
                },
            ];
        }

        // Start a chat session with history
        const chat = model.startChat({
            history: chatHistory[userId],
            generationConfig: {
                maxOutputTokens: 10000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        // Add user message and model response to history
        chatHistory[userId].push({
            role: "user",
            parts: [{ text: message }],
        });
        chatHistory[userId].push({
            role: "model",
            parts: [{ text: text }],
        });

        res.json({ reply: text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Sorry, I'm having trouble thinking right now." });
    }
};