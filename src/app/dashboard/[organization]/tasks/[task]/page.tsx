import React, { use } from 'react';
import { redirect } from 'next/navigation';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import { getTask } from '~/lib/tasks/database/queries';
import TaskItemContainer from '~/app/dashboard/[organization]/tasks/components/TaskItemContainer';
import TaskItemEnrichContainer from '../components/TaskItemEnrichContainer';

interface Context {
  params: {
    task: string;
  };
}

export const metadata = {
  title: `Task`,
};

const TaskPage = ({ params }: Context) => {
  const data = use(loadTaskData(params.task));
  const task = data.task;

  return (
    <div className="flex flex-col md:flex-row w-full gap-12">
      <TaskItemContainer task={task} />
      <TaskItemEnrichContainer enrich={task.enrich} />
    </div>
  );
};

async function loadTaskData(taskId: string) {
  const client = getSupabaseServerComponentClient();
  const { data: task } = await getTask(client, Number(taskId));
  if (!task) {
    redirect('/dashboard');
  }

  return {
    task,
  };
}

export default TaskPage;
