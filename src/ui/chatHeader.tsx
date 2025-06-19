import React from 'react';
import {
  HeaderContainer,
  Title,
  IconButton,
  IconRow
} from '../styles/styledComponents.js';
import { useTheme } from '../hooks/ThemeContext.js';

interface ChatHeaderProps {
  onOpenConfig: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onOpenConfig,
}) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <HeaderContainer>
      <Title>Odin</Title>
      <IconRow>
        <IconButton onClick={onOpenConfig} aria-label="Open config">
          <span role="img" aria-label="settings">⚙️</span>
        </IconButton>
        <IconButton onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <span role="img" aria-label="sun">☀️</span> : <span role="img" aria-label="moon">🌙</span>}
        </IconButton>
      </IconRow>
    </HeaderContainer>
  );
};

export default ChatHeader;