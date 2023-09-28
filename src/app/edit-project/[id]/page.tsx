import ProjectForm from '@/components/CreateProject/ProjectForm';
import { getProjectDetails } from '@/shared/lib/actions';
import { getCurrentUser } from '@/shared/lib/session';
import { ProjectInterface } from '@/shared/types';
import Modal from '@/shared/ui/Modal/Modal';
import { redirect } from 'next/navigation';
import React from 'react';

interface IProps {
  params: { id: string };
}

const EditProjectPage = async ({ params }: IProps) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  const { project } = (await getProjectDetails(params.id)) as {
    project: ProjectInterface;
  };

  return (
    <Modal>
      <h3 className=" modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" session={session} project={project} />
    </Modal>
  );
};

export default EditProjectPage;
