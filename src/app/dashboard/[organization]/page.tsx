'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OrgHome = () => {
  const router = useRouter();
  const params = useParams();
  router.push(`/dashboard/${params.organization}/tasks`);
  useEffect(() => {}, []);

  return (
    <div>
      <h1>Organization Home</h1>
    </div>
  );
};

export default OrgHome;
