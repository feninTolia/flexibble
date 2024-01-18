import ProfilePage from '@/components/User/ProfilePage';
import { getUserProjects } from '@/shared/lib/actions';
import { IProjectsSearch, UserProfile } from '@/shared/types';
import React from 'react';

type Props = {
  params: { id: string };
};

const UserProfileProvider = async ({ params: { id } }: Props) => {
  //todo
  const email = id.replace('%40', '@');
  const data = (await getUserProjects(email)) as IProjectsSearch;

  const projects = data?.mongoDB.projectCollection.edges;
  const creator = data.mongoDB.projectCollection.edges.at(0)?.node.createdBy;

  if (!projects || !creator) {
    return <p className=" no-result-text">Failed to fetch user info</p>;
  }

  return <ProfilePage creator={creator as UserProfile} projects={projects} />;
};

export default UserProfileProvider;
