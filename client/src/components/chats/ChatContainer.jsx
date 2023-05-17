import React, { useContext, useEffect, useRef } from "react";
import MessagesSkeleton from "../skeletons/MessagesSkeleton.jsx";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import { Tooltip } from "flowbite-react";
import Avatar from "../user/Avatar.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatFooter from "./ChatFooter.jsx";
import formatTimestampToTimeDifference from "../../utils/time.js";

const ChatContainer = ({
	handleSidebarToggle,
	currentChat,
	ready,
	messages,
	setMessages,
	chat,
	deletedMessage,
	deleteChatMessage,
	userId,
	username,
	newMessage,
	setNewMessage,
	sendChatMessage,
	webSocket,
}) => {
	const chatContainerRef = useRef(null);
	const [openModal, setOpenModal] = useState(false);
	const inputRef = useRef(null);
	const audioRef = useRef(null);
	const sendRef = useRef(null);
	/* 	const [messages, setMessages] = useState([]);*/
	const [readyMessages, setReadyMessages] = useState(false);

	/* 	useEffect(() => {
		webSocket.onmessage = async function (event) {
			let socketContent = await JSON.parse(event.data);
			let socketCommand = socketContent.command;
			let socketData = socketContent.data;
			if (socketCommand === "chat_messages_loaded") {
				setMessages(socketData);
			}
		};
	}, []); */

	function scrollToBottom() {
		chatContainerRef?.current?.scrollIntoView({
			block: "end",
		});
	}
	useEffect(() => {
		setMessages(
			messages.filter((message) => message._id !== deletedMessage?.message_id)
		),
			setReadyMessages(true);
	}, [deletedMessage]);

	const handleSubmitForm = (e) => {
		e.preventDefault();
		const inputDatas = inputRef.current.value;
		if (inputDatas.length < 1) return;
		if (inputDatas.trim() === "") return;
		inputRef.current.value = "";
		sendRef.current.play();
		sendChatMessage(currentChat, inputDatas);
	};

	const handleDeleteChatMessage = (chat_uuid) => {
		deleteChatMessage(chat_uuid);
		setOpenModal(false);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};
	useEffect(() => {
		setReadyMessages(false);
		setReadyMessages(true);
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		scrollToBottom();
		if (newMessage) {
			if (newMessage.sender_id !== userId) {
				audioRef.current.play();
			} else {
				sendRef.current.play();
			}
		}
	}, [newMessage]);

	useEffect(() => {
		scrollToBottom();
		if (newMessage) {
			if (newMessage.sender_id !== userId) {
				audioRef.current.play();
			} else {
				sendRef.current.play();
			}
		}
	}, [newMessage]);
	return (
		<>
			<audio ref={audioRef}>
				<source src="./sounds/message_received.wav" type="audio/mpeg" />
			</audio>
			<audio ref={sendRef}>
				<source src="./sounds/message_sent.wav" type="audio/mpeg" />
			</audio>

			<ChatHeader
				handleSidebarToggle={handleSidebarToggle}
				ready={ready}
				chat={chat}
			/>

			<div
				id="chat-content"
				className="flex flex-col h-full overflow-x-hidden py-4">
				<div className="flex flex-col h-full rounded-2xl">
					<ul
						ref={chatContainerRef}
						className="grid grid-cols-12 gap-y-2"
						id="messages-container">
						{readyMessages ? (
							messages.map((message, index) => (
								<li
									key={index}
									id={message._id}
									className={
										message.sender_id !== userId
											? "col-start-1 lg:col-start-1 col-end-13 gap-3 p-3 rounded-lg group"
											: "col-start-1 lg:col-start-3 col-end-13 gap-3 p-3 rounded-lg group"
									}>
									<div className="items-center justify-start group">
										<div
											className={
												message.sender_id !== userId
													? "flex"
													: "flex-row-reverse flex"
											}>
											{ready ? (
												<Avatar username={username} size={10}></Avatar>
											) : (
												""
											)}

											<div className="relative mx-3 text-sm bg-white text-black dark:bg-black dark:text-white py-2 px-4 shadow rounded-xl">
												<div>{message.content}</div>

												<div
													className={
														(message.sender_id !== userId
															? "text-right"
															: "text-left") +
														"ml-auto justify-end space-x-1 items-center text-xs text-gray-400"
													}>
													<div>
														{formatTimestampToTimeDifference(message.date)}
													</div>
												</div>

												{message.sender_id == userId ? (
													<div
														id="message-actions"
														className="absolute -top-4 left-0 w-full hidden group-hover:inline-flex space-x-1 mb-2 mt-1">
														<Tooltip
															content="Delete this message"
															animation="duration-200">
															<button
																onClick={() => setOpenModal(true)}
																className="bg-slate-500 hover:bg-red-500 text-white p-1 rounded duration-200">
																<svg
																	className="h-5 w-5"
																	fill="currentColor"
																	viewBox="0 0 24 24">
																	<path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6Zm4 12H8v-9h2v9Zm6 0h-2v-9h2v9Zm.618-15L15 2H9L7.382 4H3v2h18V4h-4.382Z"></path>
																</svg>
															</button>
														</Tooltip>
													</div>
												) : (
													""
												)}
											</div>

											{message.sender_id == userId ? (
												<div className="modal">
													<React.Fragment>
														<Modal
															show={openModal}
															onClose={() => setOpenModal(false)}>
															<Modal.Header>Delete a message</Modal.Header>
															<Modal.Body>
																<div className="space-y-6">
																	<p className="text-base leading-relaxed text-gray-900 dark:text-gray-400">
																		Are you sure you want to delete this message
																		?
																	</p>
																	<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p>
																</div>
															</Modal.Body>
															<Modal.Footer>
																<Button
																	className="bg-rose-950"
																	color="gray"
																	onClick={() =>
																		handleDeleteChatMessage(message._id)
																	}>
																	I accept
																</Button>
																<Button color="gray" onClick={handleCloseModal}>
																	Decline
																</Button>
															</Modal.Footer>
														</Modal>
													</React.Fragment>
												</div>
											) : (
												""
											)}
										</div>
									</div>
								</li>
							))
						) : (
							<MessagesSkeleton />
						)}
					</ul>
				</div>
			</div>
			<ChatFooter
				chat={chat}
				inputRef={inputRef}
				handleSubmitForm={handleSubmitForm}
			/>
		</>
	);
};

export default ChatContainer;
