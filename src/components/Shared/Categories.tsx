'use client';
import { categoryFilters } from '@/shared/constants';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {};

const Categories = ({}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    // router.push(`${pathname}?category=Frontend`);
  }, []);

  const handleTags = (category: string) => {
    router.push(`${pathname}?category=${category}`);
  };

  return (
    <div className=" flexBetween w-full gap-5 flex-wrap">
      <ul className=" flex gap-2 overflow-auto">
        {categoryFilters.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => handleTags(category)}
              className={`${
                category === selectedCategory
                  ? ' bg-light-white-300 font-medium'
                  : ' font-normal'
              } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
