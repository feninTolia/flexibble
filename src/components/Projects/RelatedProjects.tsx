import { getUserProjects } from '@/shared/lib/actions';
import { UserProfile } from '@/shared/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
  const { user } = (await getUserProjects(userId)) as { user?: UserProfile };

  if (!user) {
    return null;
  }

  const filteredProjects = user.projects.edges.filter(
    (project) => project.node.id !== projectId
  );

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className=" flexBetween">
        <p className=" text-base font-bold">More by {user.name}</p>
        <Link
          href={`/profile/${user.id}`}
          className=" text-base text-primary-purple"
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
