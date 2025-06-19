import React, { useEffect, useRef } from 'react';
import MessageBubble from './messageBubble.js';
import { Message } from '../types/chat.js';
import { MessagesListBox } from '../styles/styledComponents.js';

interface MessagesListProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <MessagesListBox>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </MessagesListBox>
  );
};

export default MessagesList;