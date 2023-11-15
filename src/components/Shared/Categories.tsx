'use client';
import { categoryFilters } from '@/shared/constants';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') ?? '');
  }, [searchParams]);

  const handleTags = (category: string) => {
    setSelectedCategory(category);
    router.push(`${pathname}?category=${category}`);
  };

  return (
    <div className=" flexBetween w-full gap-5 flex-wrap ">
      <ul className=" flex gap-2 overflow-auto pb-6">
        {categoryFilters.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => handleTags(category)}
              className={`${
                category === selectedCategory &&
                ' bg-light-white-300 hover:text-black hover:brightness-95 '
              } font-medium px-4 py-3 rounded-lg capitalize whitespace-nowrap textHover transition-all`}
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
