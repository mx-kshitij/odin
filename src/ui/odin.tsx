import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ChatPage from "./chat.js";
import { GlobalStyle } from "../styles/styles.js";
import { ThemeProvider } from "styled-components";
import { ThemeProviderCustom, useTheme } from '../hooks/ThemeContext.js';

const lightTheme = {
  background: '#f3f4f6',
  text: '#222',
  border: '#e5e7eb',
  hover: '#f3f4f6',
  mutedText: '#6b7280',
  dialogBg: '#fff',
  inputBg: '#fff',
  inputFocusBg: '#fff',
  uploadBg: '#e5e7eb',
  uploadText: '#374151',
  uploadHover: '#d1d5db',
  sendBg: '#3b82f6',
  sendHover: '#2563eb',
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  error: '#ef4444',
  errorHover: '#dc2626',
  success: '#22c55e',
  botBubble: '#f3f4f6',
  botText: '#374151',
  userBubble: '#dbeafe',
  userText: '#1e40af',
};

const darkTheme = {
  background: '#181a1b',
  text: '#fff',
  border: '#374151',
  hover: '#23272f',
  mutedText: '#9ca3af',
  dialogBg: '#23272f',
  inputBg: '#23272f',
  inputFocusBg: '#23272f',
  uploadBg: '#374151',
  uploadText: '#d1d5db',
  uploadHover: '#4b5563',
  sendBg: '#2563eb',
  sendHover: '#1e40af',
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  error: '#ef4444',
  errorHover: '#dc2626',
  success: '#22c55e',
  botBubble: '#23272f',
  botText: '#f3f4f6',
  userBubble: '#1e3a8a',
  userText: '#dbeafe',
};

const root = document.getElementById("root");
root?.classList.add("root");

function OdinApp() {
  const { isDark } = useTheme();
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ChatPage />
    </ThemeProvider>
  );
}

createRoot(root!).render(
    <StrictMode>
        <ThemeProviderCustom>
          <OdinApp />
        </ThemeProviderCustom>
    </StrictMode>
);
