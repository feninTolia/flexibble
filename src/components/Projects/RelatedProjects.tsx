import { getUserProjects } from '@/shared/lib/actions';
import { IProjectsSearch } from '@/shared/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  email: string;
  projectId: string;
};

const RelatedProjects = async ({ email, projectId }: Props) => {
  const data = (await getUserProjects(email)) as IProjectsSearch;
  const user = data?.mongoDB.projectCollection.edges.at(0)?.node.createdBy;
  const projects = data?.mongoDB.projectCollection.edges;
  if (!user || projects.length < 2) {
    return null;
  }

  const filteredProjects = data.mongoDB.projectCollection.edges.filter(
    (project) => project.node.id !== projectId
  );

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className=" flexBetween">
        <p className=" text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap ">
          More by {user.name}
        </p>
        <Link
          href={`/profile/${user.email}`}
          className=" text-base text-primary-purple whitespace-nowrap"
        >
          View all
        </Link>
      </div>

      <ul className=" related_projects-grid">
        {filteredProjects?.map(({ node }) => (
          <li
            className=" flexCenter related_project-card drop-shadow-xl"
            key={node.id}
          >
            <Link
              href={`/project/${node.id}`}
              className=" flexCenter group relative w-full h-full"
            >
              <Image
                src={node.image}
                alt="project image"
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className=" hidden group-hover:flex related_project-card_title">
                <p className=" w-full"> {node.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedProjects;
