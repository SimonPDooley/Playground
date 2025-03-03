const messageBox = document.querySelector("#messageBox");
const messageContainer = document.querySelector(".message-container");
const channelId = document.querySelector('body').dataset.channelId; // Get from data-channel-id
const user = { name: document.querySelector('body').dataset.user }; // Get from data-user

// Poll every 0.5 seconds
setInterval(getMessages, 500);
getMessages(); // Initial load

messageBox.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        const message = {
            "text": messageBox.value.trim(),
            "channelId": channelId,
            "user": user,
            "createdDate": new Date().toISOString()
        };
        const messageText = message.text;
        if (!messageText) return;

        console.log(`Sending message: ${messageText}`);
        messageBox.value = '';

        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(message)
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to send message');
            getMessages();
        })
        .catch(error => console.error('Error sending message:', error));
    }
});

function getMessages() {
    fetch(`/messages/${channelId}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch messages');
            return response.json();
        })
        .then(messages => {
            messageContainer.innerHTML = '';
            messages.forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.innerHTML = `
                    <span class="timestamp">${message.user.name}: </span>
                    <span class="message">${message.text}</span>
                `;
                messageContainer.appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}