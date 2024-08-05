'use client';
import { useParams, useRouter } from 'next/navigation';

const OrgHome = () => {
  const router = useRouter();
  const params = useParams();
  router.push(`/dashboard/${params.organization}/tasks`);
  return (
    <div>
      <h1>Organization Home</h1>
    </div>
  );
};

export default OrgHome;
