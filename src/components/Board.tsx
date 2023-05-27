'use client';

import { useBoardStore } from '@/store/boardstore';
import { FC, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import Column from './Column';

interface BoardProps {}

const Board: FC<BoardProps> = ({}) => {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);
  console.log(board);

  const handleOnDragEnd = (result: DropResult) => {};

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId='list-drop-area'
        direction='horizontal'
        type='column'
      >
        {(provided) => (
          // Rendering all the columns
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} items={column.items} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
