import React from 'react';
import { Message } from '../types/chat.js';
import { MessageBubbleBox, MessageBubbleImage } from '../styles/styledComponents.js';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  // const formatText = (text: string) => {
  //   // Handle lists
  //   let lines = text.split('\n');
  //   let inList = false;
  //   let listType = '';
    
  //   lines = lines.map((line) => {
  //     // Unordered list
  //     if (line.trim().match(/^[-*]\s/)) {
  //       const content = line.trim().replace(/^[-*]\s/, '');
  //       if (!inList || listType !== 'ul') {
  //         inList = true;
  //         listType = 'ul';
  //         return `<ul class="list-disc ml-6 my-2"><li>${content}</li>`;
  //       }
  //       return `<li>${content}</li>`;
  //     }
      
  //     // Ordered list
  //     if (line.trim().match(/^\d+\.\s/)) {
  //       const content = line.trim().replace(/^\d+\.\s/, '');
  //       if (!inList || listType !== 'ol') {
  //         inList = true;
  //         listType = 'ol';
  //         return `<ol class="list-decimal ml-6 my-2"><li>${content}</li>`;
  //       }
  //       return `<li>${content}</li>`;
  //     }
      
  //     // Close list if we're no longer in a list item
  //     if (inList && !line.trim().match(/^[-*\d]\.\s/)) {
  //       inList = false;
  //       return `</${listType}>${line}`;
  //     }
      
  //     return line;
  //   });
    
  //   // Close any open list at the end
  //   if (inList) {
  //     lines.push(`</${listType}>`);
  //   }
    
  //   // Join lines back together
  //   text = lines.join('\n');
    
  //   // Handle formatting
  //   text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 text-green-600 dark:text-green-400 px-1 py-0.5 rounded">$1</code>');
  //   text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
  //   text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
    
  //   return text;
  // };

  return (
    <MessageBubbleBox type={message.type}>
      {message.text && (
        <div
          className={message.type === 'bot' ? 'formatted-text' : ''}
          dangerouslySetInnerHTML={{
            // __html: message.type === 'bot' ? formatText(message.text) : message.text
            __html: message.text
          }}
        />
      )}
      
      {message.attachment && (
        <MessageBubbleImage
          src={message.attachment}
          alt="Attachment"
        />
      )}
    </MessageBubbleBox>
  );
};

export default MessageBubble;