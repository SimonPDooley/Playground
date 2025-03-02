var messageBox = document.querySelector("#messageBox")
setInterval(getMessages, 500)
messageBox.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		let message = {
				"text": messageBox.value,
				"channelId": channelId,
				"user": user,
				"createdDate": new Date()
		}
		let messageText = messageBox.value
		console.log(`Send message ${messageText}`)
		messageBox.value = ''
		fetch('/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(message)
		}).then(response => {getMessages()})
		return false
	}
})

function getMessages () {
	let messageContainer = document.querySelector(".message-container")
	fetch(`/messages/${channelId}`)
	.then(response => response.json())
	.then(messages => {
		messageContainer.innerHTML = ''
		messages.forEach(message => {
			messageContainer.innerHTML += `<div>
			  <span class="timestamp">${message.user.name}: </span>
		  	  <span class="message">${message.text}</span>
			</div>`
		})
	})
}