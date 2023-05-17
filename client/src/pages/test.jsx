chat.jsx;
chat,
	chats,
	ready,
	singleChat,
	deletedMessage,
	username,
	userId,
	currentChat,
	setCurrentChat,
	messages,
	setReadyMessages,
	readyMessages,
	setMessages,
	webSocket,
	sendSocketMessage,
	session,
	sendChatMessage,
	newMessage,
	setNewMessage,
	handleDisconnect,
	connectedUser,
	useEffect(() => {
		if (session === true || connectedUser) {
			return;
		} else if (session === false || !connectedUser) {
			navigate("/");
		}
	}, [session]);
useEffect(() => {
	if (connectedUser) {
		const sessionId = window.localStorage.getItem("session_id");
		let sessionData = {
			session_id: sessionId,
		};

		sendSocketMessage(
			webSocket,
			"check_session|||" + JSON.stringify(sessionData)
		);
		sendSocketMessage(webSocket, "load_chats|||");
	}
}, [connectedUser]);
