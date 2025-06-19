import { ConnectionConfig } from '../types/chat.js';
import { ChatProvider } from '../types/Provider.js';
import { openAIProvider } from './openAIProvider.js';
import { azureProvider } from './azureProvider.js';
import { awsProvider } from './awsProvider.js';
import { localProvider } from './localProvider.js';

export function getProvider(config: ConnectionConfig): ChatProvider {
  switch (config.serviceType) {
    case 'open-ai':
      return openAIProvider;
    case 'azure-openai':
      return azureProvider;
    case 'aws-bedrock':
      return awsProvider;
    case 'local':
      return localProvider;
    default:
      throw new Error('Unknown provider');
  }
} 