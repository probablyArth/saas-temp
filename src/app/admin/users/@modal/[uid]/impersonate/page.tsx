import { use } from 'react';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import AdminGuard from '~/app/admin/components/AdminGuard';
import ImpersonateUserConfirmationModal from '~/app/admin/users/@modal/[uid]/components/ImpersonateUserConfirmationModal';
import { withI18n } from '~/i18n/with-i18n';

interface Params {
  params: {
    uid: string;
  };
}

function ImpersonateUserModalPage({ params }: Params) {
  const client = getSupabaseServerComponentClient({ admin: true });
  const { data, error } = use(client.auth.admin.getUserById(params.uid));

  if (!data || error) {
    throw new Error(`User not found`);
  }

  return <ImpersonateUserConfirmationModal user={data.user} />;
}

export default withI18n(AdminGuard(ImpersonateUserModalPage));
