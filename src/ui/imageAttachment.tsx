import React from 'react';
import {
  CloseButton,
  ImageAttachmentWrapper,
  ImageAttachmentBox,
  ImageAttachmentImg,
  ImageAttachmentRemoveButton
} from '../styles/styledComponents.js';

interface ImageAttachmentProps {
  src: string;
  onRemove: () => void;
}

const ImageAttachment: React.FC<ImageAttachmentProps> = ({ src, onRemove }) => {
  return (
    <ImageAttachmentWrapper>
      <ImageAttachmentBox>
        <ImageAttachmentImg
          src={src}
          alt="Attachment preview"
        />
        <ImageAttachmentRemoveButton onClick={onRemove}>
          <CloseButton style={{ width: '0.75rem', height: '0.75rem' }} />
        </ImageAttachmentRemoveButton>
      </ImageAttachmentBox>
    </ImageAttachmentWrapper>
  );
};

export default ImageAttachment;