import { getModules } from "../mxfunctions/projectTools.js";

import React from 'react';
import ChatHeader from './chatHeader.js';
import MessagesList from './messagesList.js';
import MessageInput from './messageInput.js';
import { Message } from '../types/chat.js';
import { ChatContainerBox } from '../styles/styledComponents.js';

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (text: string, attachment?: string) => void;
  isThinking: boolean;
  isConnected: boolean;
  onOpenConfig: () => void;
}

async function renderModules() {
    const moduleJSON = await getModules();
    const modules = JSON.parse(moduleJSON);
    const chatBody = document.querySelector(".chat-body");
    if (chatBody) {
        modules.forEach((module: any) => {
            const moduleElement = document.createElement("div");
            moduleElement.className = "module";
            moduleElement.innerHTML = `<h2>${module.name}</h2><p>${module.description}</p>`;
            chatBody.appendChild(moduleElement);
        }
    );
    }
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onSendMessage,
  isThinking,
  isConnected,
  onOpenConfig,
}) => {
  return (
    <ChatContainerBox>
      <ChatHeader
        onOpenConfig={onOpenConfig}
      />
      <MessagesList messages={messages} />
      <MessageInput
        onSendMessage={onSendMessage}
        isThinking={isThinking}
        disabled={!isConnected}
      />
    </ChatContainerBox>
  );
};

export default ChatContainer;