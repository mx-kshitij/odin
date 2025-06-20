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
  // Local state for each field
  const [serviceType, setServiceType] = useState<ConnectionConfig['serviceType']>(connectionConfig.serviceType);
  const [modelUrl, setModelUrl] = useState(connectionConfig.modelUrl);
  const [modelName, setModelName] = useState(connectionConfig.modelName);
  const [systemPrompt, setSystemPrompt] = useState(connectionConfig.systemPrompt);
  const [authType, setAuthType] = useState<ConnectionConfig['authType']>(connectionConfig.authType || 'api-key');
  const [apiKey, setApiKey] = useState(connectionConfig.apiKey || '');
  const [apiVersion, setApiVersion] = useState(connectionConfig.apiVersion || '');
  const [bearerToken, setBearerToken] = useState(connectionConfig.bearerToken || '');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setServiceType(connectionConfig.serviceType);
    setModelUrl(connectionConfig.modelUrl);
    setModelName(connectionConfig.modelName);
    setSystemPrompt(connectionConfig.systemPrompt);
    setAuthType(connectionConfig.authType || 'api-key');
    setApiKey(connectionConfig.apiKey || '');
    setApiVersion(connectionConfig.apiVersion || '');
    setBearerToken(connectionConfig.bearerToken || '');
  }, [connectionConfig]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!modelUrl.trim()) {
      newErrors.modelUrl = 'Please enter a model URL';
    }
    if (!modelName.trim()) {
      newErrors.modelName = 'Please enter a model name';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConnect = async () => {
    if (!validateForm()) return;
    setIsConnecting(true);
    try {
      const config: ConnectionConfig = {
        serviceType,
        modelUrl,
        modelName,
        systemPrompt,
        authType,
        apiKey: authType === 'api-key' ? apiKey : '',
        apiVersion,
        bearerToken: authType === 'bearer' ? bearerToken : '',
      };
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
              value={serviceType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setServiceType(e.target.value as ConnectionConfig['serviceType'])}
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
              value={modelUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModelUrl(e.target.value)}
              placeholder="Enter model URL"
            />
            {errors.modelUrl && <ErrorText>{errors.modelUrl}</ErrorText>}
          </div>
          <div>
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              type="text"
              value={modelName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModelName(e.target.value)}
              placeholder="Enter model name"
            />
            {errors.modelName && <ErrorText>{errors.modelName}</ErrorText>}
          </div>
          <div>
            <Label htmlFor="system-prompt">System Prompt</Label>
            <Textarea
              id="system-prompt"
              value={systemPrompt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="auth-type">Authentication Type</Label>
            <Select
              id="auth-type"
              value={authType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const newAuthType = e.target.value as ConnectionConfig['authType'];
                setAuthType(newAuthType);
                setApiKey('');
                setBearerToken('');
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
              value={apiVersion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiVersion(e.target.value)}
              placeholder="e.g. 2024-04-01-preview"
            />
          </div>
          {authType === 'api-key' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  value={apiKey}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                  placeholder="Enter API key"
                />
              </div>
              <Button type="button" style={{ height: '2.5rem', width: "70px" }} onClick={async () => {
                if (navigator.clipboard) {
                  try {
                    const text = await navigator.clipboard.readText();
                    setApiKey(text);
                  } catch (err) {
                    alert('Failed to read clipboard');
                  }
                } else {
                  alert('Clipboard API not supported');
                }
              }}>Paste</Button>
            </div>
          )}
          {authType === 'bearer' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="bearer-token">Bearer Token</Label>
                <Input
                  id="bearer-token"
                  value={bearerToken}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBearerToken(e.target.value)}
                  placeholder="Enter Bearer token"
                  onPaste={e => { console.log('Paste event on Bearer Token input', e); }}
                />
              </div>
              <Button type="button" style={{ height: '2.5rem', width: "70px" }} onClick={async () => {
                if (navigator.clipboard) {
                  try {
                    const text = await navigator.clipboard.readText();
                    setBearerToken(text);
                  } catch (err) {
                    alert('Failed to read clipboard');
                  }
                } else {
                  alert('Clipboard API not supported');
                }
              }}>Paste</Button>
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