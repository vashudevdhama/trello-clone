'use client';

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
      {item.title}
    </div>
  );
};

export default ItemCard;
