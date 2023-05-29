'use client';

import Image from 'next/image';
import { FC } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useBoardStore } from '@/store/boardstore';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);
  return (
    <header>
      <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-purple-300 to-blue-300 opacity-50 filter blur-3xl -z-10'></div>
      <div className='flex flex-row justify-between space-x-4 p-4 bg-gray-400/5'>
        <Image
          src='/assets/images/trello-logo.png'
          alt='Trello Logo'
          width={300}
          height={100}
          className='w-8 md:w-10 object-contain'
        />

        <div className='flex-1 md:flex-initial'>
          {/* Search bar */}
          <form className='flex items-center space-x-2 bg-white rounded-md shadow-md flex-1 md:flex-initial'>
            <MagnifyingGlassIcon className='p-1 h-6 w-6 text-gray-400' />
            <input
              type='text'
              placeholder='Search'
              className='flex-1 outline-none py-2'
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type='submit' hidden>
              Search
            </button>
          </form>
          {/* Avatar */}
        </div>
      </div>
    </header>
  );
};

export default Header;
