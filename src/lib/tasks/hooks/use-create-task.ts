import useSWRMutation from 'swr/mutation';

import useSupabase from '~/core/hooks/use-supabase';
import { createTask } from '../database/mutations';
import type Task from '../types/task';

function useCreateTaskMutation() {
  const client = useSupabase();
  const key = 'tasks';

  return useSWRMutation(
    key,
    async (_, { arg: task }: { arg: Omit<Task, 'id'> }) => {
      return createTask(client, task);
    },
  );
}

export default useCreateTaskMutation;
