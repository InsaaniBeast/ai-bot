async function sendMessage() {
    const inputBox = document.getElementById("inputBox");
    const chatbox = document.getElementById("chatbox");
    const userMessage = inputBox.value;

    // Display user message
    chatbox.innerHTML += `<div class="user">User: ${userMessage}</div>`;
    inputBox.value = ''; // Clear input box

    // Show animated typing effect from AI
    chatbox.innerHTML += `<div class="ai typing">AI is typing...</div>`;
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom

    // Send the message to the Flask backend (API)
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    // Replace typing effect with actual AI response
    const aiMessageDiv = document.querySelector('.ai.typing');
    aiMessageDiv.textContent = `AI: ${data.reply}`;
    aiMessageDiv.classList.remove('typing'); // Remove typing class
}
