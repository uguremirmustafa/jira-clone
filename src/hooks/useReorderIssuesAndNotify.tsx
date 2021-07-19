import { Maybe } from 'graphql/jsutils/Maybe';
import { useSnackbar } from 'notistack';
import {
  GetProjectByIdQuery,
  GetProjectIssuesByProjectIdQuery,
  useUpdateIssuesOrderMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';
import { GetProjectIssuesByProjectId } from '../lib/graphql/project/queries/getProjectIssuesByProjectId';

export const useReorderIssuesAndNotify = (): ((
  newestIssuesArray: {
    index: number;
    column_id: any;
    description?: Maybe<string> | undefined;
    id: string;
    priority: number;
    project_id: any;
    title: string;
    type?: Maybe<string> | undefined;
    owner_id?: Maybe<string> | undefined;
  }[],
  projectId: string
) => Promise<void>) => {
  // snackbar
  const { enqueueSnackbar } = useSnackbar();

  // update issues order mutation
  const [updateIssuesOrderMutation] = useUpdateIssuesOrderMutation();
  const update = async (
    newestIssuesArray: {
      index: number;
      column_id: any;
      description?: Maybe<string> | undefined;
      id: string;
      priority: number;
      project_id: any;
      title: string;
      type?: Maybe<string> | undefined;
      owner_id?: Maybe<string> | undefined;
    }[],
    projectId: string
  ) => {
    try {
      const res = await updateIssuesOrderMutation({
        variables: {
          issues: newestIssuesArray,
          projectId,
        },
        // refetchQueries: [{ query: GetProjectById, variables: { projectId } }],
        // awaitRefetchQueries: true,
        optimisticResponse: {
          __typename: 'mutation_root',
          insert_issues: {
            __typename: 'issues_mutation_response',
            returning: newestIssuesArray
              // .map((i) => ({ ...i, type: 'devugurwashere' }))
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
            if (!response?.insert_issues?.returning) return;
            if (data?.projects_by_pk?.issues) {
              let newIssues = data.projects_by_pk.issues
                .slice()
                .sort((a, b) => (a.index > b.index ? 1 : -1))
                .map(
                  (issue) =>
                    response.insert_issues?.returning.find((i) => i.id === issue.id) || issue
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
                    issues: newIssues.map((issue) => ({ ...issue, __typename: 'issues' })),
                  },
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
      if (res.data?.insert_issues?.returning !== null) {
        enqueueSnackbar(`Success`, {
          variant: 'success',
        });
      } else if (res.errors) {
        enqueueSnackbar(`Something went wrong`, {
          variant: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return update;
};
