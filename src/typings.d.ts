interface Board {
  columns: Map<ColumnType, Column>;
}

type ColumnType = 'todo' | 'inprogress' | 'done';

interface Column {
  id: ColumnType;
  items: Item[];
}

interface Item {
  id: string;
  created_at: string;
  title: string;
  status: ColumnType;
}
