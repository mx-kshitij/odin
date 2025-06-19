import React, { useState, useEffect } from 'react';
import { ConnectionConfig } from '../types/chat.js';
import {
  Overlay,
  Dialog,
  DialogHeader,
  Title,
  CloseButton,
  Form,
  Status,
  StatusText,
  Label,
  Input,
  Textarea,
  Select,
  ErrorText,
  Button
} from '../styles/styledComponents.js';

interface ConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
  onConnect: (config: ConnectionConfig) => Promise<void>;
  onDisconnect: () => Promise<void>;
  connectionConfig: ConnectionConfig;
}

const ConfigDialog: React.FC<ConfigDialogProps> = ({
  isOpen,
  onClose,
  isConnected,
  onConnect,
  onDisconnect,
  connectionConfig,
}) => {
  const [config, setConfig] = useState<ConnectionConfig>({
    ...connectionConfig,
    // Default to api-key if no auth type is set
    authType: connectionConfig.authType || 'api-key'
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Update config when connectionConfig changes
  useEffect(() => {
    const updatedConfig = { ...connectionConfig };
    // Ensure there's always a valid authType
    if (!updatedConfig.authType || updatedConfig.authType !== 'api-key' && updatedConfig.authType !== 'bearer') {
      updatedConfig.authType = 'api-key';
    }
    setConfig(updatedConfig);
  }, [connectionConfig]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!config.modelUrl.trim()) {
      newErrors.modelUrl = 'Please enter a model URL';
    }
    if (!config.modelName.trim()) {
      newErrors.modelName = 'Please enter a model name';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConnect = async () => {
    if (!validateForm()) return;
    setIsConnecting(true);
    try {
      await onConnect(config);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      await onDisconnect();
    } finally {
      setIsDisconnecting(false);
    }
  };

  const updateConfig = (updates: Partial<ConnectionConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach(key => {
        delete newErrors[key];
      });
      return newErrors;
    });
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Dialog>
        <DialogHeader>
          <Title>Configuration</Title>
          <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>
        </DialogHeader>
        <Form>
          <Status>
            <span className="font-medium">Status: </span>
            <StatusText connected={isConnected}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </StatusText>
          </Status>
          <div>
            <Label htmlFor="service-type">Service type</Label>
            <Select
              id="service-type"
              value={config.serviceType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateConfig({ serviceType: e.target.value as any})}
            >
              <option value="azure-openai">Azure OpenAI</option>
              <option value="open-ai">OpenAI</option>
              <option value="local">Local</option>
              <option value="aws-bedrock">AWS Bedrock</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="model-url">Model URL</Label>
            <Input
              id="model-url"
              type="text"
              value={config.modelUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ modelUrl: e.target.value })}
              placeholder="Enter model URL"
            />
            {errors.modelUrl && <ErrorText>{errors.modelUrl}</ErrorText>}
          </div>
          <div>
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              type="text"
              value={config.modelName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ modelName: e.target.value })}
              placeholder="Enter model name"
            />
            {errors.modelName && <ErrorText>{errors.modelName}</ErrorText>}
          </div>
          <div>
            <Label htmlFor="system-prompt">System Prompt</Label>
            <Textarea
              id="system-prompt"
              value={config.systemPrompt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateConfig({ systemPrompt: e.target.value })}
              placeholder="Enter system prompt"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="auth-type">Authentication Type</Label>
            <Select
              id="auth-type"
              value={config.authType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const newAuthType = e.target.value as 'api-key' | 'bearer';
                updateConfig({ 
                  authType: newAuthType,
                  apiKey: '',
                  bearerToken: ''
                });
              }}
            >
              <option value="api-key">API Key</option>
              <option value="bearer">Bearer Token</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="api-version">API Version (optional)</Label>
            <Input
              id="api-version"
              type="text"
              value={config.apiVersion || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ apiVersion: e.target.value })}
              placeholder="e.g. 2024-04-01-preview"
            />
          </div>
          {config.authType === 'api-key' && (
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={config.apiKey || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  updateConfig({ apiKey: e.target.value })
                }
                placeholder="Enter API key"
              />
            </div>
          )}
          {config.authType === 'bearer' && (
            <div>
              <Label htmlFor="bearer-token">Bearer Token</Label>
              <Input
                id="bearer-token"
                type="password"
                value={config.bearerToken || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  updateConfig({ bearerToken: e.target.value })
                }
                placeholder="Enter Bearer token"
                onPaste={e => { console.log('Paste event on Bearer Token input', e); }}
              />
            </div>
          )}
          {!isConnected ? (
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? 'Connecting...' : 'Connect'}
            </Button>
          ) : (
            <Button onClick={handleDisconnect} disabled={isDisconnecting} destructive>
              {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
            </Button>
          )}
        </Form>
      </Dialog>
    </Overlay>
  );
};

export default ConfigDialog;