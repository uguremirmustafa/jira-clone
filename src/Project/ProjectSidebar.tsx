import {
  Divider,
  Drawer,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  MenuList,
  Typography,
} from '@material-ui/core';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
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
    projectTitle: {
      padding: theme.spacing(4),
    },
  };
});
interface Props {
  id: string;
  projectTitle: string | undefined;
  isOwner: boolean;
}

export const ProjectSidebar: FC<Props> = ({ id, projectTitle, isOwner }) => {
  const { pathname } = useLocation();

  const c = useStyles();
  return (
    <Drawer
      className={c.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: c.drawerPaper }}
    >
      <Typography variant="h6" color="textPrimary" component="h1" className={c.projectTitle}>
        {projectTitle}
      </Typography>
      <Divider />

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
        {isOwner && (
          <MenuItem
            component={NavLink}
            to={`/project/${id}/danger`}
            selected={pathname === `/project/${id}/danger`}
          >
            <ListItemIcon>
              <ReportProblemRoundedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText color="secondary">Danger Zone</ListItemText>
          </MenuItem>
        )}
      </MenuList>
    </Drawer>
  );
};
