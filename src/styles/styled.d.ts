import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    border: string;
    hover: string;
    mutedText: string;
    dialogBg: string;
    inputBg: string;
    inputFocusBg: string;
    uploadBg: string;
    uploadText: string;
    uploadHover: string;
    sendBg: string;
    sendHover: string;
    primary: string;
    primaryHover: string;
    error: string;
    errorHover: string;
    success: string;
    botBubble: string;
    botText: string;
    userBubble: string;
    userText: string;
  }
} 