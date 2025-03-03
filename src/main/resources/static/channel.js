const messageBox = document.querySelector("#messageBox");
const messageContainer = document.querySelector(".message-container");

// Poll every 2 seconds (adjustable; 500ms might be too aggressive)
setInterval(getMessages, 2000);

// Fetch messages on page load
getMessages();

// Send message on Enter key press
messageBox.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) { // Enter key
        const message = {
            "text": messageBox.value.trim(), // Trim whitespace
            "channelId": channelId, // Assumes channelId is defined globally
            "user": user,           // Assumes user is defined globally
            "createdDate": new Date().toISOString() // Standardize date format
        };

        const messageText = message.text;
        if (!messageText) return; // Skip empty messages

        console.log(`Sending message: ${messageText}`);
        messageBox.value = ''; // Clear input immediately

        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(message)
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to send message');
            getMessages(); // Fetch updated messages after sending
        })
        .catch(error => console.error('Error sending message:', error));
    }
});

// Fetch and display messages
function getMessages() {
    fetch(`/messages/${channelId}`) // Assumes channelId is defined globally
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch messages');
            return response.json();
        })
        .then(messages => {
            messageContainer.innerHTML = ''; // Clear existing messages
            messages.forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.innerHTML = `
                    <span class="timestamp">${message.user.name}: </span>
                    <span class="message">${message.text}</span></br>
                `;
                messageContainer.appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}