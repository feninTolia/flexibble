import { ProjectInterface, UserProfile } from '@/shared/types';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Shared/Button';
import ProjectCard from '../Projects/ProjectCard';

type Props = {
  creator: UserProfile;
  projects: { node: ProjectInterface }[];
};

const ProfilePage = ({ creator, projects }: Props) => (
  <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
    <section className="flexBetween max-lg:flex-col gap-10 w-full">
      <div className="flex items-start flex-col w-full">
        <Image
          src={creator?.avatarUrl}
          width={100}
          height={100}
          className="rounded-full"
          alt="user image"
        />
        <p className="text-4xl font-bold mt-10">{creator?.name}</p>
        <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
          I’m Junior Frontend Developer 👋
        </p>

        <div className="flex mt-8 gap-5 w-full flex-wrap">
          <Link
            target="_blank"
            href={'https://www.linkedin.com/in/anatolii-fenin/'}
          >
            <Button
              title="Follow"
              leftIcon="/plus-round.svg"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
            />
          </Link>
          <Link target="_blanc" href={`mailto:${creator?.email}`}>
            <Button title="Hire Me" leftIcon="/email.svg" />
          </Link>
        </div>
      </div>

      {projects?.length > 0 ? (
        <Image
          src={projects[0].node.image}
          alt="project image"
          width={739}
          height={554}
          className="rounded-xl object-contain"
        />
      ) : (
        <Image
          src="/profile-post.png"
          width={739}
          height={554}
          alt="project image"
          className="rounded-xl"
        />
      )}
    </section>

    <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
      <p className="w-full text-left text-lg font-semibold">Recent Work</p>

      <div className="profile_projects">
        {projects?.map(({ node }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node.image}
            title={node?.title}
            name={creator.name}
            avatarUrl={creator.avatarUrl}
            email={creator.email}
          />
        ))}
      </div>
    </section>
  </section>
);

export default ProfilePage;
