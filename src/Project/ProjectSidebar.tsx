import {
  Drawer,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { appBarHeight, drawerWidth } from '../shared/Constants';

const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: appBarHeight,
      backgroundColor: theme.palette.common.white,
    },
    list: {
      padding: '1rem',
    },
  };
});
interface Props {
  id: string;
}

export const ProjectSidebar: FC<Props> = ({ id }) => {
  const { pathname } = useLocation();

  const c = useStyles();
  return (
    <Drawer
      className={c.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: c.drawerPaper }}
    >
      <MenuList className={c.list}>
        <MenuItem
          component={NavLink}
          to={`/project/${id}/settings`}
          selected={pathname === `/project/${id}/settings`}
        >
          <ListItemIcon>
            <ViewListRoundedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>Project Settings</ListItemText>
        </MenuItem>
        <MenuItem
          component={NavLink}
          to={`/project/${id}/board`}
          selected={pathname === `/project/${id}/board`}
        >
          <ListItemIcon>
            <DashboardRoundedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>Board</ListItemText>
        </MenuItem>
      </MenuList>
    </Drawer>
  );
};
