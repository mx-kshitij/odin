import { ChatProvider, ProviderResult } from '../types/Provider.js';
import { AzureOpenAI } from 'openai';
import { DefaultAzureCredential, getBearerTokenProvider } from '@azure/identity';
import { defaultSystemPrompt } from '../lib/defaults.js';
import { ConnectionConfig, Message } from '../types/chat.js';
import {
  ChatCompletionMessageParam,
  ChatCompletionUserMessageParam,
  ChatCompletionAssistantMessageParam,
} from 'openai/resources/chat/completions';
import { toolRegistry } from '../tools/toolRegistry.js';

export const azureProvider: ChatProvider<AzureOpenAI> = {
  async connect(config) {
    const credential = new DefaultAzureCredential();
    const scope = 'https://cognitiveservices.azure.com/.default';
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);
    return new AzureOpenAI({
      endpoint: config.modelUrl,
      azureADTokenProvider,
      deployment: config.modelName,
    });
  },
  async sendMessage(client, messages: Message[], config: ConnectionConfig, mappedMessagesOverride?: ChatCompletionMessageParam[]): Promise<ProviderResult> {
    const mappedMessages: ChatCompletionMessageParam[] = mappedMessagesOverride ?? [
      { role: 'system', content: defaultSystemPrompt },
      ...messages.map(m =>
        m.type === 'user'
          ? ({ role: 'user', content: m.text } as ChatCompletionUserMessageParam)
          : ({ role: 'assistant', content: m.text } as ChatCompletionAssistantMessageParam)
      )
    ];
    const result = await client.chat.completions.create({
      messages: mappedMessages,
      model: config.modelName,
      // If you want to support function calling, add functions here
      // functions: [...],
    });
    const choice = result.choices[0];
    // Handle tool_calls (multi-tool support)
    if (choice.message.tool_calls && choice.message.tool_calls.length > 0) {
      let newMappedMessages = [...mappedMessages];
      for (const toolCall of choice.message.tool_calls) {
        const { name, arguments: args } = toolCall.function;
        let toolResult = 'Tool not found.';
        if (toolRegistry[name]) {
          try {
            toolResult = await toolRegistry[name](JSON.parse(args));
          } catch (e) {
            toolResult = `Tool error: ${e}`;
          }
        }
        const functionMessage = {
          role: 'function' as const,
          name,
          content: toolResult,
        } as ChatCompletionMessageParam;
        newMappedMessages = [...newMappedMessages, functionMessage];
      }
      // Recursively call sendMessage with all function results added (OpenAI format)
      return await this.sendMessage(client, [], config, newMappedMessages);
    }
    // For now, only handle text responses
    return {
      type: 'text',
      content: choice.message.content ?? '',
    };
  }
};