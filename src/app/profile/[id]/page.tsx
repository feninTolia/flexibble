import ProfilePage from '@/components/User/ProfilePage';
import { getUserProjects } from '@/shared/lib/actions';
import { UserProfile } from '@/shared/types';
import React from 'react';

type Props = {
  params: { id: string };
};

const UserProfileProvider = async ({ params }: Props) => {
  const result = (await getUserProjects(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result) {
    return <p className=" no-result-text">Failed to fetch user info</p>;
  }

  return <ProfilePage user={result?.user} />;
};

export default UserProfileProvider;
