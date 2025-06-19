import React, { useState } from 'react';
import ImageAttachment from './imageAttachment.js';
import {
  MessageInputContainer,
  ThinkingText,
  MessageInputRow,
  MessageInputField,
  ImageUploadLabel,
  SendButton,
  PaperclipIcon
} from '../styles/styledComponents.js';

interface MessageInputProps {
  onSendMessage: (text: string, attachment?: string) => void;
  isThinking: boolean;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isThinking,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

  const canSend = !disabled && !isThinking && (message.trim() || attachment);

  const handleSend = () => {
    if (canSend) {
      onSendMessage(message, attachment || undefined);
      setMessage('');
      setAttachment(null);
      setAttachmentFile(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && canSend) {
      handleSend();
    }
  };

  const handleImageSelect = (file: File) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed.');
      return;
    }

    // Check file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert('Image size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAttachment(event.target.result as string);
        setAttachmentFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setAttachment(null);
    setAttachmentFile(null);
  };

  return (
    <MessageInputContainer>
      {isThinking && (
        <ThinkingText>Bot is thinking...</ThinkingText>
      )}
      {attachment && (
        <ImageAttachment
          src={attachment}
          onRemove={handleRemoveImage}
        />
      )}
      <MessageInputRow>
        <MessageInputField
          type="text"
          value={message}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          disabled={disabled}
        />
        <ImageUploadLabel>
          <PaperclipIcon
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="attach file"
          >
            <path d="M21 12.79V17a5 5 0 01-10 0V7a3 3 0 016 0v8a1 1 0 01-2 0V8" />
          </PaperclipIcon>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageSelect(file);
              }
            }}
            style={{ display: 'none' }}
          />
        </ImageUploadLabel>
        <SendButton
          onClick={handleSend}
          disabled={!canSend}
        >
          <span role="img" aria-label="send">➤</span>
        </SendButton>
      </MessageInputRow>
    </MessageInputContainer>
  );
};

export default MessageInput;