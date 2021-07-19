import { useSnackbar } from 'notistack';
import {
  Columns,
  GetProjectByIdQuery,
  useDeleteColumnMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';

export const useDeleteColumnAndNotify = (): ((
  columnId: string,
  columns: Pick<Columns, 'id' | 'index' | 'name'>[] | undefined,
  projectId: string
) => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();

  const [deleteColumnMutation] = useDeleteColumnMutation();
  const deleteColumn = async (
    columnId: string,
    columns: Pick<Columns, 'id' | 'index' | 'name'>[] | undefined,
    projectId: string
  ) => {
    try {
      enqueueSnackbar('Deleting column from database, wait...', {
        variant: 'info',
      });
      const res = await deleteColumnMutation({
        variables: { id: columnId },
        refetchQueries: [{ query: GetProjectById, variables: { projectId } }],
        awaitRefetchQueries: true,
        optimisticResponse: {
          __typename: 'mutation_root',
          delete_columns_by_pk: {
            __typename: 'columns',
            id: columnId,
            index: columns?.find((col) => col.id === columnId)?.index || 0,
            name: columns?.find((col) => col.id === columnId)?.name || 'asd',
          },
        },
        update: (cache, { data: response }) => {
          const data = cache.readQuery<GetProjectByIdQuery>({
            query: GetProjectById,
            variables: { projectId },
          });
          if (!response?.delete_columns_by_pk?.id) return;
          if (data?.projects_by_pk?.columns) {
            cache.writeQuery<GetProjectByIdQuery>({
              query: GetProjectById,
              variables: { projectId },
              data: {
                __typename: 'query_root',
                projects_by_pk: {
                  ...data.projects_by_pk,
                  columns: data.projects_by_pk.columns.filter((col) => col.id !== columnId),
                },
              },
            });
          }
        },
      });
      if (res.data?.delete_columns_by_pk !== null) {
        enqueueSnackbar(`Column deleted successfully`, {
          variant: 'success',
        });
      } else if (res.data.delete_columns_by_pk === null) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return deleteColumn;
};
