import { useEffect, useState } from 'react';
import { AzureOpenAI } from 'openai';
import { DefaultAzureCredential, getBearerTokenProvider } from '@azure/identity';
import { defaultSystemPrompt } from '../lib/defaults.js';
import { ConnectionConfig } from '../types/chat.js';

export function useAzureOpenAI(config: ConnectionConfig) {
  const [client, setClient] = useState<AzureOpenAI | null>(null);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!config) return;
    const credential = new DefaultAzureCredential();
    const scope = 'https://cognitiveservices.azure.com/.default';
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);
    const openAIClient = new AzureOpenAI({
      endpoint: config.modelUrl,
      azureADTokenProvider,
      deployment: config.modelName,
    });
    setClient(openAIClient);

    (async () => {
      const res = await openAIClient.chat.completions.create({
        messages: [{ role: 'system', content: defaultSystemPrompt }],
        model: '',
      });
      setResult(res.choices);
    })();
  }, [config]);

  return { client, result };
} 