import { getItemsGroupedByColumn } from '@/lib/getItemsGroupedByColumn';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
  board: {
    columns: new Map<ColumnType, Column>(),
  },
  getBoard: async () => {
    // fetch from local storage and group
    const board = await getItemsGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
}));
