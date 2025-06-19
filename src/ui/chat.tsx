import React, { useState, useEffect } from 'react';
import ChatContainer from './chatContainer.js';
import ConfigDialog from './configDialog.js';
import { useTheme } from '../hooks/useTheme.js';
import { ConnectionConfig, Message } from '../types/chat.js';
import { ChatFullScreenContainer } from '../styles/styledComponents.js';
import { useChat } from '../hooks/useChat.js';
import { saveFile, loadFile } from '../main/fileHandler.js';
import { extensionPath, configFileName } from '../lib/defaults.js';

const CONFIG_FILE = `${extensionPath}/${configFileName}`;

const ChatPage: React.FC = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionConfig, setConnectionConfig] = useState<ConnectionConfig>({
    serviceType: "azure-openai",
    modelUrl: "",
    modelName: "",
    systemPrompt: "",
    authType: "api-key",
    authValue: ""
  });
  useTheme();

  // Always call useChat, pass null config if not connected
  const chatHook = useChat(isConnected ? connectionConfig : null);
  const messagesList = chatHook ? chatHook.messagesList : [];
  const sendMessage = chatHook ? chatHook.sendMessage : () => {};

  useEffect(() => {
    setIsConfigOpen(true);
  }, []);

  // Load config from file when dialog opens
  useEffect(() => {
    if (isConfigOpen) {
      (async () => {
        try {
          const text = await loadFile(CONFIG_FILE);
          if (text) {
            setConnectionConfig(JSON.parse(text));
          }
        } catch (e) {
          // File may not exist yet; ignore error
        }
      })();
    }
  }, [isConfigOpen]);

  const handleSendMessage = (text: string, attachment?: string) => {
    const newMessage: Message = {
      id: (messagesList.length + 1).toString(),
      text,
      type: 'user',
      attachment,
      timestamp: new Date(),
    };
    sendMessage(newMessage);
  };

  const handleConnect = async (config: ConnectionConfig) => {
    // Save config to file
    await saveFile(CONFIG_FILE, JSON.stringify(config, null, 2));
    setConnectionConfig(config);
    setIsConnected(true);
    setIsConfigOpen(false);
    // Send initial hello message as user
    setTimeout(() => {
      sendMessage({
        id: '1',
        text: 'Hello!',
        type: 'user',
        timestamp: new Date(),
      });
    }, 0);
  };

  const handleDisconnect = async () => {
    setIsConnected(false);
    setIsConfigOpen(true);
  };

  return (
    <ChatFullScreenContainer>
      <ChatContainer
        messages={messagesList}
        onSendMessage={handleSendMessage}
        isThinking={isThinking}
        isConnected={isConnected}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      <ConfigDialog
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        isConnected={isConnected}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        connectionConfig={connectionConfig}
      />
    </ChatFullScreenContainer>
  );
};

export default ChatPage;