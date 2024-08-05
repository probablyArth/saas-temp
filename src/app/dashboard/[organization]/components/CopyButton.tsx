'use client';

import React from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Button from '~/core/ui/Button';

const CopyButton: React.FC<{ content: string }> = ({ content }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Button variant="ghost" onClick={handleCopy}>
      <DocumentDuplicateIcon width={18} height={18} />
    </Button>
  );
};

export default CopyButton;
