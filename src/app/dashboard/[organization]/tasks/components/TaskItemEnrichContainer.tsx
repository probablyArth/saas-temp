import React, { FC, useEffect } from 'react';
import { Json } from '~/database.types';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import CopyButton from '../../components/CopyButton';

const TaskItemEnrichContainer: FC<{ enrich: Json | null }> = ({ enrich }) => {
  const renderEnrichContent = () => {
    if (enrich === null) {
      return 'DeckMatrix at work. Check in few mins';
    }

    try {
      // If it's already a string, just return it
      if (typeof enrich === 'string') {
        return enrich;
      }

      // If it's an object or array, stringify it with formatting
      return JSON.stringify(enrich, null, 2);
    } catch (error) {
      console.error('Error stringifying enrich data:', error);
      return 'Error displaying enrich data';
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 max-w-[50%]">
      <div className="flex justify-between w-full items-center">
        <Heading type={4}>Enriching the deck</Heading>
        <CopyButton content={renderEnrichContent()} />
      </div>
      <div className="min-h-[600px] rounded-sm flex flex-col items-center justify-center border-[1px]">
        <pre className="w-full p-4 overflow-auto">{renderEnrichContent()}</pre>
      </div>
    </div>
  );
};

export default TaskItemEnrichContainer;
