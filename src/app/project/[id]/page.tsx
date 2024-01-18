import ProjectActions from '@/components/Projects/ProjectActions';
import RelatedProjects from '@/components/Projects/RelatedProjects';
import ErrorText from '@/components/Shared/ErrorText';
import { getProjectDetails } from '@/shared/lib/actions';
import { getCurrentUser } from '@/shared/lib/session';
import { ProjectInterface } from '@/shared/types';
import Modal from '@/shared/ui/Modal/Modal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { id: string };
};

const ProjectPage = async ({ params }: Props) => {
  const data = (await getProjectDetails(params.id)) as {
    mongoDB: { project: ProjectInterface };
  };

  const session = await getCurrentUser();

  if (!data.mongoDB.project) {
    return <ErrorText>Failed to fetch project information</ErrorText>;
  }

  const project = data.mongoDB.project;
  return (
    <Modal>
      <section className=" w-full flex justify-between items-center">
        <div className=" flex gap-4 items-center">
          <Image
            src={project.createdBy.avatarUrl}
            alt="Author Avatar"
            width={50}
            height={50}
            className=" rounded-full block object-cover"
          />
          <div className="flex-col">
            <span className="font-bold">{project.title}</span>
            <div className="flex gap-2">
              <Link
                href={`/profile/${project.createdBy.email}`}
                className=" text-gray overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {project.createdBy.name}
              </Link>
              <Image
                src="/dot.svg"
                width={4}
                height={4}
                alt="dot"
                className="max-sm:hidden"
              />
              <span className="max-sm:hidden text-primary-purple">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        {session?.user.email === project.createdBy.email && (
          <div className="flex justify-end items-center gap-2 ">
            <ProjectActions projectId={project.id} />
          </div>
        )}
      </section>

      <section>
        <div className=" mt-8">
          <Image
            src={project.image}
            alt="Project image"
            width={400}
            height={315}
            className="  w-full object-cover rounded-xl"
          />
        </div>
        <h2 className=" text-center mt-8">{project.description}</h2>
      </section>

      <section className=" flexCenter gap-6 mt-4  text-primary-purple">
        <a target="blank" rel="noreferrer" href={project.githubUrl}>
          🖥 <span className=" underline">GitHub</span>
        </a>

        <a target="blank" rel="noreferrer" href={project.liveSiteUrl}>
          🚀 <span className=" underline">Live Site</span>
        </a>
      </section>

      <section className=" w-full flex items-center gap-8 mt-20">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Image
          src={project.createdBy.avatarUrl}
          className="rounded-full shrink-0"
          width={82}
          height={82}
          alt="profile image"
        />
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects email={project.createdBy.email} projectId={project.id} />
    </Modal>
  );
};

export default ProjectPage;
