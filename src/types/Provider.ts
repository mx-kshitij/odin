import { Message, ConnectionConfig } from './chat.js';

export type ProviderResult = {
  type: 'text' | 'tool';
  content: string;
  toolName?: string;
  toolInput?: any;
};

export interface ChatProvider<ClientType = any> {
  connect(config: ConnectionConfig): Promise<ClientType>;
  sendMessage(
    client: ClientType,
    messages: Message[],
    config: ConnectionConfig,
    mappedMessagesOverride?: any // or ChatCompletionMessageParam[] if you want to be strict
  ): Promise<ProviderResult>;
} 