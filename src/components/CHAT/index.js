import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import io from 'socket.io-client';

import {
  MainChatContainer,
  User,
  SearchContainer,
  SearchIcon,
  UsersList,
  SendContainer,
  NameTime,
  EmojiIcon,
  Name,
  LikeBtn,
  LikeIcon,
  NM,
  Profile,
  MessageContainer,
  ChatBox,
  MessageParagraph,
  SearchInput,
  EmojiContainer,
  EmojiButton,
  EmojiPicker,
} from './chatstyledcomponents';

const socket = io('https://exact-spaceapi.onrender.com');
const user_list = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin'];

const CHAT = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [filteredUserList, setFilteredUserList] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    const emoji = event.emoji;
    setMessage(prevMessage => prevMessage + emoji);
  };

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on('chat message', handleReceivedMessage);

    return () => {
      socket.off('chat message', handleReceivedMessage);
    };
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setMessage(inputValue);

    // Detect "@" symbol and show user list
    const mentionIndex = inputValue.lastIndexOf('@');
    if (mentionIndex !== -1) {
      const query = inputValue.slice(mentionIndex + 1).toLowerCase();
      const filteredUsers = user_list.filter(user =>
        user.toLowerCase().startsWith(query)
      );
      setFilteredUserList(filteredUsers);
      setShowUserList(true);
    } else {
      setShowUserList(false);
      setFilteredUserList([]);
    }
  };

  const handleUserClick = (username) => {
    setMessage(prevMessage => {
      const mentionIndex = prevMessage.lastIndexOf('@');
      const newMessage =
        prevMessage.slice(0, mentionIndex + 1) + username + ' ';
      return newMessage;
    });
    setShowUserList(false);
    setFilteredUserList([]);
  };

  const handleSendClick = () => {
    const username = user_list[Math.floor(Math.random() * user_list.length)];
    const data = { username, message, likes: 0, timestamp: new Date() };
    socket.emit('chat message', data);
    setMessage('');
  };

  const getProfileBackgroundColor = (username) => {
    const firstLetter = username.charAt(0).toLowerCase();
    const colors = {
      a: '#FFCDD2',
      b: '#F8BBD0',
      c: '#E1BEE7',
      d: '#D1C4E9',
      e: '#C5CAE9',
      // Add more colors for other letters
    };

    return colors[firstLetter] || '#FFFFFF'; // Default color if letter not found
  };

  const handleLikeClick = (index) => {
    setChatMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const updatedMessage = { ...updatedMessages[index] };
      updatedMessage.likes++;
      updatedMessages[index] = updatedMessage;
      return updatedMessages;
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  const toggleEmojiPicker = () => {
    setShowEmojis((prevShowEmojis) => !prevShowEmojis);
  };

  return (
    <MainChatContainer>
      <div>
        {chatMessages.map((msg, index) => (
          <ChatBox key={index}>
            <Profile style={{ backgroundColor: getProfileBackgroundColor(msg.username.charAt(0)) }}>
              <strong>{msg.username.charAt(0)}</strong>
            </Profile>
            <NM>
              <NameTime>
                <Name>{msg.username}</Name>
                <br />
                <small>{formatTime(msg.timestamp)}</small>
              </NameTime>
              <br />
              <MessageContainer>
                <MessageParagraph>{msg.message}</MessageParagraph>
              </MessageContainer>
            </NM>
            <LikeBtn onClick={() => handleLikeClick(index)}>
              <LikeIcon /> {msg.likes}
            </LikeBtn>
          </ChatBox>
        ))}
      </div>
      <div>
      {showUserList && (
            <UsersList>
              {filteredUserList.map((user, index) => (
                <User key={index} onClick={() => handleUserClick(user)}>
                  {user}
                </User>
              ))}
            </UsersList>
          )}
        <SearchContainer>
          <SearchInput
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type a message"
          />
          
          <EmojiContainer>
            <EmojiButton onClick={toggleEmojiPicker}>
              <EmojiIcon />
            </EmojiButton>
            {showEmojis && (
              <EmojiPicker>
                <Picker pickerStyle={{ width: '100%' }} onEmojiClick={onEmojiClick} />
              </EmojiPicker>
            )}
          </EmojiContainer>
          <SendContainer onClick={handleSendClick}>
            <SearchIcon />
            send
          </SendContainer>
        </SearchContainer>
      </div>
    </MainChatContainer>
  );
};

export default CHAT;
