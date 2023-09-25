'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface IProps {
  id: string;
  title: string;
  image: string;
  name: string;
  avatarUrl: string;
  userId: string;
}

const ProjectCard = ({ title, image, name, avatarUrl, userId, id }: IProps) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState('');

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 1000));
    setRandomViews((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k');
  }, []);
  return (
    <div className=" flexCenter flex-col rounded-2xl drop-shadow-xl">
      <Link
        href={`/project/${id}`}
        className=" flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          alt="Project Image"
          width={414}
          height={314}
          className=" w-full h-full object-cover rounded-2xl"
        />
        <div className=" hidden group-hover:flex profile_card-title">
          <p className=" w-full"> {title}</p>
        </div>
      </Link>
      <div className=" flexBetween w-full px-2 mt-3">
        <Link href={`/profile/${userId}`}>
          <div className=" flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              alt="User image"
              className=" rounded-full"
            />
            <span>{name}</span>
          </div>
        </Link>

        <div className=" flexCenter gap-3">
          <div className=" flexCenter gap-2">
            <Image src={`/hearth.svg`} width={13} height={13} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className=" flexCenter gap-2">
            <Image src={`/eye.svg`} width={13} height={13} alt="eye" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
