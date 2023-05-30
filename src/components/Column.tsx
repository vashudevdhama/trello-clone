import { useBoardStore } from '@/store/boardstore';
import { useModalStore } from '@/store/ModalStore';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ItemCard from './ItemCard';

interface ColumnProps {
  id: ColumnType;
  index: number;
  items: Item[];
}

const idToColumnText: {
  [key in ColumnType]: string;
} = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

const Column: FC<ColumnProps> = ({ id, items, index }) => {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);
  const [isOpen, openModal] = useModalStore((state) => [
    state.isOpen,
    state.openModal,
  ]);

  const handleAddItem = () => {
    setNewTaskType(id);
    openModal();
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* vertical column DragDropContext  */}
          <Droppable droppableId={index.toString()} type='card'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'
                }`}
              >
                <h2 className='flex justify-between font-bold text-md p-2 py-1'>
                  {idToColumnText[id]}{' '}
                  <span className='text-gray-500 bg-gray-200 rounded-full p-2 text-sm leading-3 font-normal'>
                    {!searchString
                      ? items.length
                      : items.filter((item) =>
                          item.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className='space-y-2'>
                  {items.map((item, index) => {
                    if (
                      searchString &&
                      !item.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;

                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <ItemCard
                            item={item}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}

                  <div className='flex items-end justify-end p-2'>
                    <button className='text-green-500 hover:text-green-600'>
                      <PlusCircleIcon
                        className='h-10 w-10'
                        onClick={handleAddItem}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
