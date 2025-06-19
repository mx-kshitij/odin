import { ChatProvider, ProviderResult } from '../types/Provider.js';
import { Message, ConnectionConfig } from '../types/chat.js';

export const localProvider: ChatProvider = {
  async connect(config: ConnectionConfig): Promise<any> {
    return null;
  },
  async sendMessage(client: any, messages: Message[], config: ConnectionConfig, mappedMessagesOverride?: any): Promise<ProviderResult> {
    // TODO: Replace with real local logic
    return { type: 'text', content: 'Local response (mock)' };
  },
}; 