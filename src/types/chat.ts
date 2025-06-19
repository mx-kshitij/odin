export interface Message {
  id: string;
  text: string;
  type: 'user' | 'bot';
  attachment?: string;
  timestamp: Date;
}

export interface ConnectionConfig {
  serviceType: 'azure-openai' | 'open-ai' | 'local' | 'aws-bedrock';
  modelUrl: string;
  modelName: string;
  systemPrompt: string;
  authType: 'api-key' | 'bearer';
  apiKey?: string;
  apiVersion?: string;
  bearerToken?: string;
}

export interface ImageAttachment {
  data: string;
  file: File;
}