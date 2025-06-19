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
  authType: 'entra' | 'api-key' | 'bearer';
  authValue?: string;
}

export interface ImageAttachment {
  data: string;
  file: File;
}