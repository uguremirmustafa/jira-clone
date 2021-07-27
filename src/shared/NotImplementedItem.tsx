import { Tooltip } from '@material-ui/core';
import { FC } from 'react';

type Props = {
  children: JSX.Element;
};

export const NotImplementedItem: FC<Props> = ({ children }) => {
  return <Tooltip title="Not Implemented Yet">{children}</Tooltip>;
};
