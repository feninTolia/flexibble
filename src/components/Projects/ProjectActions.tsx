'use client';
import { deleteProject, fetchToken } from '@/shared/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Spinner from '../Shared/Spinner';

type Props = {
  projectId: string;
};

const ProjectActions = ({ projectId }: Props) => {
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);
      router.push('/');
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className=" flexCenter edit-action_btn min-w-[40px]"
        onClick={() => setIsEditLoading(true)}
      >
        {isEditLoading ? (
          <Spinner size="15" />
        ) : (
          <Image src="/pencile.svg" width={15} height={15} alt="edit" />
        )}
      </Link>
      <button
        type="button"
        className={` flexCenter delete-action_btn min-w-[40px] ${
          isDeleting ? 'bg-gray' : ' bg-primary-purple'
        }`}
        onClick={handleDeleteProject}
        disabled={isDeleting}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
