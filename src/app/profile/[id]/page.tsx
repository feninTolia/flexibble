import React from 'react';

type Props = {
  params: { id: string };
};

const ProfilePage = ({ params }: Props) => {
  return <div>ProfilePage of - {params.id}</div>;
};

export default ProfilePage;
