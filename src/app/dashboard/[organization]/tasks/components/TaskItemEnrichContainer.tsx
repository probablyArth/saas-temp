import React, { FC, useMemo } from 'react';
import { Json } from '~/database.types';
import Heading from '~/core/ui/Heading';
import CopyButton from '../../components/CopyButton';

const TaskItemEnrichContainer: FC<{ enrich: Json | null }> = ({ enrich }) => {
  const renderEnrichContent = () => {
    if (enrich === null) {
      return { text: 'DeckMatrix at work. Check in few mins', success: false };
    }

    try {
      // If it's already a string, just return it
      if (typeof enrich === 'string') {
        return { text: enrich, success: true };
      }

      // If it's an object or array, stringify it with formatting
      return { text: JSON.stringify(enrich, null, 2), success: true };
    } catch (error) {
      console.error('Error stringifying enrich data:', error);
      return { text: 'Error displaying enrich data', success: false };
    }
  };

  const text = useMemo(() => renderEnrichContent(), [enrich]);

  return (
    <div className="flex flex-col w-full h-[100%] gap-4 md:max-w-[50%]">
      <div className="flex justify-between w-full items-center h-[10%]">
        <Heading type={4}>Enriching the deck</Heading>
        {text.success && <CopyButton content={text.text} />}
      </div>
      <div className="h-[65vh] rounded-sm flex flex-col items-center justify-center border-[1px] ">
        {text.success ? (
          <pre className="w-full p-4 overflow-auto">{text.text}</pre>
        ) : (
          <p>{text.text}</p>
        )}
      </div>
    </div>
  );
};

export default TaskItemEnrichContainer;
