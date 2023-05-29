export const getItemsGroupedByColumn = async () => {
  //TODO: get from Local storage
  const data: { total: number; documents: Item[] } = {
    total: 2,
    documents: [
      {
        id: 'alpha1',
        created_at: '2023-05-27T20:19:23.130Z',
        title: 'Do your homework on time',
        status: 'todo',
      },
      {
        id: 'alpha2',
        created_at: '2023-05-27T20:15:23.130Z',
        title: 'Play Cricket',
        status: 'todo',
      },
      {
        id: 'alpha3',
        created_at: '2023-05-27T20:15:23.130Z',
        title: 'Play football',
        status: 'inprogress',
      },
    ],
  };

  const documents = data.documents;

  const columns = documents.reduce((acc, item) => {
    if (!acc.get(item.status)) {
      acc.set(item.status, {
        id: item.status,
        items: [],
      });
    }

    acc.get(item.status)!.items.push({
      id: item.id,
      created_at: item.created_at,
      title: item.title,
      status: item.status,
    });

    return acc;
  }, new Map<ColumnType, Column>());

  const columnTypes: ColumnType[] = ['todo', 'inprogress', 'done'];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        items: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
