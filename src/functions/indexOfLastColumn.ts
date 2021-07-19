import { Columns } from '../lib/generated/apolloComponents';

export const IndexOfLatestColumn = (
  columns: Pick<Columns, 'id' | 'name' | 'index'>[] | undefined
): number => {
  let indexOfLastColumn = 0;
  if (columns) {
    if (columns.length > 0) {
      indexOfLastColumn = columns[columns.length - 1].index;
    }
  }
  return indexOfLastColumn;
};
