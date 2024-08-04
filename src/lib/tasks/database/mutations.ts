import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import type Task from '../types/task';
import { TASKS_TABLE } from '~/lib/db-tables';

type Client = SupabaseClient<Database>;

export function createTask(client: Client, task: Omit<Task, 'id'>) {
  return client.from(TASKS_TABLE).insert({
    name: task.name,
    organization_id: task.organizationId,
    done: task.done,
    pdf_path: task.pdf_path,
  });
}

export function updateTask(
  client: Client,
  task: Partial<Task> & { id: number },
) {
  return client
    .from(TASKS_TABLE)
    .update({
      name: task.name,
      done: task.done,
    })
    .match({
      id: task.id,
    })
    .throwOnError();
}

export function deleteTask(client: Client, taskId: number) {
  return client
    .from(TASKS_TABLE)
    .delete()
    .match({
      id: taskId,
    })
    .throwOnError();
}
