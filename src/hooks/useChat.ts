import { useEffect, useState } from 'react';
import { Message, ConnectionConfig } from '../types/chat.js';
import { getProvider } from '../providers/getProvider.js';
import { toolRegistry } from '../tools/toolRegistry.js';

export function useChat(config: ConnectionConfig | null) {
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    if (!config) return;
    async function doConnect() {
      const provider = getProvider(config as ConnectionConfig);
      const c = await provider.connect(config as ConnectionConfig);
      setClient(c);
    }
    doConnect();
  }, [config]);

  const sendMessage = async (newMessage: Message) => {
    if (!client || !config) return;
    const provider = getProvider(config as ConnectionConfig);
    const result = await provider.sendMessage(client, [...messagesList, newMessage], config as ConnectionConfig);

    if (result.type === 'text') {
      setMessagesList([...messagesList, newMessage, {
        id: (messagesList.length + 2).toString(),
        text: result.content,
        type: 'bot',
        timestamp: new Date(),
      }]);
    } else if (result.type === 'tool' && result.toolName) {
      // Call the tool and add its result
      const toolFn = toolRegistry[result.toolName];
      let toolResult = 'Tool not found.';
      if (toolFn) {
        toolResult = await toolFn(result.toolInput);
      }
      setMessagesList([...messagesList, newMessage, {
        id: (messagesList.length + 2).toString(),
        text: toolResult,
        type: 'bot',
        timestamp: new Date(),
      }]);
    }
  };

  if (!config) {
    return {
      messagesList: [],
      sendMessage: () => {},
    };
  }

  return { messagesList, sendMessage };
} 