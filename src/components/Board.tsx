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
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);
  console.log(board);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log({ destination, source, type });

    if (!destination) return;

    // column drag
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }
    // card drag
    else if (type === 'card') {
      const columns = Array.from(board.columns);
      const startColIndex = columns[Number(source.droppableId)];
      const endColIndex = columns[Number(destination.droppableId)];

      const startCol: Column = {
        id: startColIndex[0],
        items: startColIndex[1].items,
      };

      const endCol: Column = {
        id: endColIndex[0],
        items: endColIndex[1].items,
      };

      if (!startCol || !endCol) return;
      if (source.index === destination.index && startCol === endCol) return;

      const newItems = startCol.items;
      const [itemMoved] = newItems.splice(source.index, 1);

      if (startCol.id === endCol.id) {
        // same column task drag
        newItems.splice(destination.index, 0, itemMoved);
        const newCol = {
          id: startCol.id,
          items: newItems,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);

        setBoardState({ ...board, columns: newColumns });
      } else {
        // another column task drag
        const endItems = Array.from(endCol.items);
        endItems.splice(destination.index, 0, itemMoved);

        const newColumns = new Map(board.columns);
        const newCol = {
          id: startCol.id,
          items: newItems,
        };

        newColumns.set(startCol.id, newCol);
        newColumns.set(endCol.id, {
          id: endCol.id,
          items: endItems,
        });

        // update local storage
        setBoardState({ ...board, columns: newColumns });
      }
    }
  };

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
