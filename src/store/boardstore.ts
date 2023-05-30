import { getItemsGroupedByColumn } from '@/lib/getItemsGroupedByColumn';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (item: Item, columnId: ColumnType) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: ColumnType;
  setNewTaskType: (input: ColumnType) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  addTask: (item: string, columnId: ColumnType) => void;
  deleteTask: (taskIndex: number, itemId: Item, id: ColumnType) => void;
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  board: {
    columns: new Map<ColumnType, Column>(),
  },
  getBoard: async () => {
    // fetch from local storage and group
    const board = await getItemsGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (item, columnId) => {
    //TODO: save in local storage
    // update status to columnId by item.id
  },
  newTaskInput: '',
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  addTask: async (item: string, columnId: ColumnType) => {
    const uniqueId = nanoid();
    const title = item;
    const status = columnId;
    // TODO add in local storage

    set({ newTaskInput: '' });
    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newItem: Item = {
        id: uniqueId,
        created_at: new Date().toISOString(),
        title,
        status,
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          items: [newItem],
        });
      } else {
        newColumns.get(columnId)?.items.push(newItem);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
  deleteTask: async (taskIndex: number, itemId: Item, id: ColumnType) => {
    const newColumns = new Map(get().board.columns);

    // delete todoID from newColumns
    newColumns.get(id)?.items.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    //TODO: delete from local storage
  },
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),

  newTaskType: 'todo',
  setNewTaskType: (input: ColumnType) => set({ newTaskType: input }),
}));
