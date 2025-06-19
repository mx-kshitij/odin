import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const Dialog = styled.div`
  background: ${({ theme }) => theme.dialogBg};
  color: ${({ theme }) => theme.text};
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  border: 1px solid ${({ theme }) => theme.border};
  width: 22rem;
  padding: 1.5rem;
`;

export const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const DialogTitle = styled.h3`
  font-weight: 500;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.mutedText};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Status = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const StatusText = styled.span<{ connected: boolean }>`
  color: ${({ connected, theme }) => (connected ? theme.success : theme.error)};
  font-weight: 500;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  text-align: left;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.inputFocusBg};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  resize: vertical;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.inputFocusBg};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.inputFocusBg};
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

export const Button = styled.button<{ destructive?: boolean }>`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  background: ${({ destructive, theme }) => (destructive ? theme.error : theme.primary)};
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ destructive, theme }) => (destructive ? theme.errorHover : theme.primaryHover)};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const HeaderContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  color: ${({ theme }) => theme.text};
  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;

export const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MessageInputContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBg};
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

export const ThinkingText = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.mutedText};
  margin-bottom: 0.5rem;
`;

export const MessageInputField = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
  &:disabled {
    opacity: 0.5;
  }
`;

export const ImageUploadLabel = styled.label`
  background: ${({ theme }) => theme.uploadBg};
  color: ${({ theme }) => theme.uploadText};
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.uploadHover};
  }
`;

export const SendButton = styled.button`
  background: ${({ theme }) => theme.sendBg};
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1rem;
  transition: background 0.2s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.sendHover};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MessageInputRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ChatContainerBox = styled.div`
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  border: none;
`;

export const MessageBubbleBox = styled.div<{ type: 'user' | 'bot' }>`
  padding: 0.5rem;
  border-radius: 0.75rem;
  max-width: 80%;
  margin-left: ${({ type }) => (type === 'user' ? 'auto' : '0')};
  margin-right: ${({ type }) => (type === 'user' ? '0' : 'auto')};
  background: ${({ type, theme }) =>
    type === 'user' ? theme.userBubble : theme.botBubble};
  color: ${({ type, theme }) =>
    type === 'user' ? theme.userText : theme.botText};
  align-self: ${({ type }) => (type === 'user' ? 'flex-end' : 'flex-start')};
`;

export const MessageBubbleImage = styled.img`
  margin-top: 0.5rem;
  max-width: 100%;
  border-radius: 0.5rem;
  max-height: 200px;
`;

export const MessagesListBox = styled.div`
  padding: 1rem;
  height: 16rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 5.5rem;
`;

export const ImageAttachmentWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

export const ImageAttachmentBox = styled.div`
  position: relative;
  display: inline-block;
`;

export const ImageAttachmentImg = styled.img`
  height: 6rem;
  width: auto;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const ImageAttachmentRemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.error};
  color: #fff;
  border-radius: 9999px;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 0.75rem;
  cursor: pointer;
`;

export const ChatFullScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
`;

export const PaperclipIcon = styled.svg`
  width: 20px;
  height: 20px;
  display: block;
  stroke: currentColor;
  cursor: pointer;
`; 