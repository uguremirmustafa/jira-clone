import { useSnackbar } from 'notistack';
import {
  GetProjectByIdQuery,
  useUpdateColumnsOrderMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';

export const useReorderColumnsAndNotify = (): ((
  newestColumnsArray: {
    index: number;
    id: any;
    name: string;
  }[],
  projectId: string
) => Promise<void>) => {
  // snackbar
  const { enqueueSnackbar } = useSnackbar();

  // update issues order mutation
  const [updateColumnsOrderMutation] = useUpdateColumnsOrderMutation();
  const updateColumns = async (
    newestColumnsArray: {
      index: number;
      id: any;
      name: string;
    }[],
    projectId: string
  ) => {
    try {
      const res = await updateColumnsOrderMutation({
        variables: {
          columns: newestColumnsArray.map((i) => ({ ...i, project_id: projectId })),
          projectId,
        },
        refetchQueries: [{ query: GetProjectById, variables: { projectId } }],
        awaitRefetchQueries: true,
        optimisticResponse: {
          __typename: 'mutation_root',
          insert_columns: {
            __typename: 'columns_mutation_response',
            returning: newestColumnsArray
              .map((i) => ({ ...i, project_id: projectId }))
              .slice()
              .sort((a, b) => (a.index > b.index ? 1 : -1)),
          },
        },
        update: (cache, { data: response }) => {
          try {
            const data = cache.readQuery<GetProjectByIdQuery>({
              query: GetProjectById,
              variables: { projectId },
            });
            if (!response?.insert_columns?.returning) return;
            if (data?.projects_by_pk?.columns) {
              let newColumns = data.projects_by_pk.columns
                .slice()
                .sort((a, b) => (a.index > b.index ? 1 : -1))
                .map(
                  (column) =>
                    response.insert_columns?.returning.find((i) => i.id === column.id) || column
                )
                .slice()
                .sort((a, b) => (a.index > b.index ? 1 : -1));
              cache.writeQuery<GetProjectByIdQuery>({
                query: GetProjectById,
                variables: { projectId },
                data: {
                  __typename: 'query_root',
                  projects_by_pk: {
                    __typename: 'projects',
                    ...data.projects_by_pk,
                    columns: newColumns.map((column) => ({ ...column, __typename: 'columns' })),
                  },
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
      if (res.data?.insert_columns?.returning !== null) {
        enqueueSnackbar(`Success`, {
          variant: 'success',
        });
      } else if (res.errors) {
        enqueueSnackbar(`Something went wrong`, {
          variant: 'error',
        });
      }
    } catch (error) {
      console.log(error + 'asdsadsa');
    }
  };
  return updateColumns;
};
