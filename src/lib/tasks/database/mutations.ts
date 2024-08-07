import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import type Task from '../types/task';
import { TASKS_TABLE } from '~/lib/db-tables';
import path from 'path';
import { readFile } from 'fs/promises';

export async function readJsonFile(filename: string) {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), 'public', filename);

  // Read the json file
  const jsonData = await readFile(filePath, 'utf8');

  // Parse the json data
  return JSON.parse(jsonData);
}

type Client = SupabaseClient<Database>;

export async function createTask(
  client: Client,
  task: Omit<Omit<Task, 'id'>, 'enrich'>,
) {
  const jsonFile = await readJsonFile('./assets/data/enrich.mock.json');

  return client
    .from(TASKS_TABLE)
    .insert({
      name: task.name,
      organization_id: task.organizationId,
      done: task.done,
      pdf_path: task.pdf_path,
      enrich: jsonFile,
    })
    .select('id');
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
