import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { FC } from 'react';

//interface
interface IProps {
  loading: Boolean;
}

//styles
const useStyles = makeStyles((theme) => {
  return {
    skeletonWrapper: {
      display: 'flex',
      gap: theme.spacing(2),
    },
    skeletonBody: {
      display: 'grid',
      gap: theme.spacing(2),
      width: '100%',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    },
    skeletonTitle: {
      gridColumn: '1/6',
      display: 'flex',
      gap: theme.spacing(1),
    },
  };
});

export const BoardSkeleton: FC<IProps> = ({ loading }) => {
  const c = useStyles();
  if (loading) {
    return (
      <div className={c.skeletonWrapper}>
        <div className={c.skeletonBody}>
          <div className={c.skeletonTitle}>
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="circle" width={40} height={40} />
          </div>
          <Skeleton variant="rect" height={300} />
          <Skeleton variant="rect" height={300} />
          <Skeleton variant="rect" height={300} />
          <Skeleton variant="rect" height={300} />
          <Skeleton variant="rect" height={300} />
        </div>
      </div>
    );
  }
  return <div></div>;
};
