import ProjectForm from '@/components/CreateProject/ProjectForm';
import { getCurrentUser } from '@/shared/lib/session';
import Modal from '@/shared/ui/Modal/Modal';
import { redirect } from 'next/navigation';
import React from 'react';

const CreateProject = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  return (
    <Modal>
      <h3 className=" modal-head-text">Create a New Project</h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProject;
