import ProjectCard from '@/components/Projects/ProjectCard';
import { fetchAllProjects } from '@/shared/lib/actions';
import { ProjectInterface } from '@/shared/types';

interface IProjectsSearch {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasNextPag: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export default async function Home() {
  const data = (await fetchAllProjects()) as IProjectsSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className=" flexStart flex-col paddings">
        CATEGORIES
        <p className=" no-result-text text-center">
          No projects found, go create some first
        </p>
      </section>
    );
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className=" projects-grid">
        {projectsToDisplay.map(({ node }) => (
          <ProjectCard
            key={node.id}
            id={node.id}
            title={node.title}
            image={node.image}
            name={node.createdBy.name}
            avatarUrl={node.createdBy.avatarUrl}
            userId={node.createdBy.id}
          />
        ))}
      </section>
      <h1>Load More</h1>
    </section>
  );
}
