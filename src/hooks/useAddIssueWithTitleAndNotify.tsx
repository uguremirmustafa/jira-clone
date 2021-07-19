import { useSnackbar } from 'notistack';
import {
  Exact,
  GetProjectByIdQuery,
  useCreateIssueWithTitleMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';

export const useAddIssueWithTitleAndNotify = (): ((
  variables:
    | Exact<{
        projectId: string;
        columnId: string;
        title: string;
        index: number;
      }>
    | undefined,
  projectId: string
) => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();

  const [createIssueWithTitleMutation] = useCreateIssueWithTitleMutation();
  const addIssue = async (
    variables:
      | Exact<{
          projectId: string;
          columnId: string;
          title: string;
          index: number;
        }>
      | undefined,
    projectId: string
  ) => {
    try {
      enqueueSnackbar('Adding issue, wait...', {
        variant: 'info',
      });
      const res = await createIssueWithTitleMutation({
        variables,
        refetchQueries: [{ query: GetProjectById, variables: { projectId } }],
        awaitRefetchQueries: true,
        optimisticResponse: {
          __typename: 'mutation_root',
          insert_issues_one: {
            __typename: 'issues',
            column_id: variables?.columnId,
            id: Math.round(Math.random() * -1000000),
            index: variables?.index || 0,
            priority: 3,
            project_id: projectId,
            title: variables?.title || '',
            description: null,
            type: null,
            owner_id: null,
          },
        },
        update: async (cache, { data: response }) => {
          const data = await cache.readQuery<GetProjectByIdQuery>({
            query: GetProjectById,
            variables: { projectId },
          });
          if (!response?.insert_issues_one) return;
          if (typeof response.insert_issues_one.id === 'string') return;
          if (data?.projects_by_pk?.issues) {
            cache.writeQuery<GetProjectByIdQuery>({
              query: GetProjectById,
              variables: { projectId },
              data: {
                __typename: 'query_root',
                projects_by_pk: {
                  ...data.projects_by_pk,
                  issues: [...data.projects_by_pk.issues, response?.insert_issues_one],
                },
              },
            });
          }
        },
      });
      if (res.data?.insert_issues_one !== null) {
        enqueueSnackbar(`Issue added successfully`, {
          variant: 'success',
        });
      } else if (res.data.insert_issues_one === null) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return addIssue;
};
