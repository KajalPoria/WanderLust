document.addEventListener("DOMContentLoaded", () => {
    const chatToggleButton = document.getElementById("chat-toggle");
    const chatWidget = document.getElementById("chat-widget");
    const chatBody = document.getElementById("chat-body");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-message");
    const sendButton = document.getElementById("chat-send");

    if (!chatToggleButton || !chatWidget || !chatBody || !chatForm || !chatInput || !sendButton) {
        console.error("Chat UI elements not found!");
        return;
    }

    // Toggle chat widget
    chatToggleButton.addEventListener("click", () => {
        chatWidget.classList.toggle("open");
        if (chatWidget.classList.contains("open")) {
            chatInput.focus();
        }
    });

    // Handle chat form submission
    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        // Display user message
        addMessageToChat(message, "user");
        chatInput.value = "";
        sendButton.disabled = true;

        // Show typing indicator
        showLoading();

        try {
            // Send message to backend
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: message }),
            });

            // Remove typing indicator
            hideLoading();

            if (!response.ok) {
                let errorData;
               try {
                   // Try to get JSON error from our new API error handler
                   errorData = await response.json();
               } catch (parseError) {
                   // If parsing fails, it's a different error
                   throw new Error("Received an invalid response from the server.");
               }
               // Throw the error message from the JSON payload
              throw new Error(errorData.error || "An unknown error occurred.");
            }

            const data = await response.json();
            // Display bot reply
            addMessageToChat(data.reply, "bot");

        } catch (error) {
            console.error("Chat error:", error);
            hideLoading();
            addMessageToChat(error.message, "bot");
        } finally {
            sendButton.disabled = false;
        }
    });

    // Function to add a message to the chat body
    function addMessageToChat(text, role) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${role}`;
        
        const p = document.createElement("p");
        p.textContent = text;
        
        messageDiv.appendChild(p);
        chatBody.appendChild(messageDiv);

        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Function to show the typing indicator
    function showLoading() {
        const loadingDiv = document.createElement("div");
        loadingDiv.className = "chat-message bot loading";
        loadingDiv.id = "loading-indicator";
        loadingDiv.innerHTML = `
            <p>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </p>
        `;
        chatBody.appendChild(loadingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Function to hide the typing indicator
    function hideLoading() {
        const loadingIndicator = document.getElementById("loading-indicator");
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }
});