'use client';

import type { FormEventHandler } from 'react';
import { useCallback, useTransition } from 'react';
import { toast } from 'sonner';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import { useTranslation } from 'react-i18next';

import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import { createTaskAction } from '~/lib/tasks/actions';
import useCsrfToken from '~/core/hooks/use-csrf-token';
import { useUploadFile } from '~/lib/storage/upload';

const TaskForm: React.FC = () => {
  const [isMutating, startTransition] = useTransition();
  const organization = useCurrentOrganization();
  const organizationId = organization?.id as number;
  const csrfToken = useCsrfToken();
  const { t } = useTranslation();
  const uploadFile = useUploadFile();

  const onCreateTask: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.currentTarget;
      const data = new FormData(target);
      const name = data.get('name') as string;
      const pdf = data.get('pdf') as File;

      if (name.trim().length < 3) {
        toast.error(t('task:taskNameError'));
        return;
      }

      startTransition(async () => {
        const task = {
          organizationId,
          name,
          done: false,
          pdf_path: (await uploadFile(pdf)).path,
        };
        await createTaskAction({ task, csrfToken });
      });
    },
    [csrfToken, organizationId, t, uploadFile],
  );

  return (
    <form className={'flex flex-col'} onSubmit={onCreateTask}>
      <div className={'flex flex-col space-y-4 w-full'}>
        <TextField.Label>
          <Trans i18nKey={'task:taskNameLabel'} />

          <TextField.Input
            required
            name={'name'}
            placeholder={'Task name...'}
          />
        </TextField.Label>
        <TextField.Label>
          <Trans i18nKey={'task:taskPdfLabel'} />

          <TextField.Input
            required
            name={'pdf'}
            type="file"
            accept="application/pdf"
          />
        </TextField.Label>

        <div className={'flex justify-end'}>
          <Button variant={'flat'} loading={isMutating}>
            <If
              condition={isMutating}
              fallback={<Trans i18nKey={'task:createTaskLabel'} />}
            >
              <Trans i18nKey={'task:creatingTaskLabel'} />
            </If>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
