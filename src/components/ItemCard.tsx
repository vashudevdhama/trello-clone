'use client';

import { XCircleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

interface ItemCardProps {
  item: Item;
  index: number;
  id: ColumnType;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const ItemCard: FC<ItemCardProps> = ({
  item,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}) => {
  return (
    <div
      className='bg-white rounded-md space-y-2 drop-shadow-md'
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className='flex justify-between items-center p-5'>
        <p>{item.title}</p>
        <button className='text-red-500 hover:text-red-600'>
          <XCircleIcon className='ml-5 h-8 w-8' />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
