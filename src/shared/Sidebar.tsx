import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import { Link } from 'react-router-dom';
import { appBarHeight, drawerWidth } from './Constants';

const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: appBarHeight,
      backgroundColor: theme.palette.primary.light,
    },
  };
});

export const Sidebar = () => {
  const c = useStyles();
  return (
    <Drawer
      className={c.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: c.drawerPaper }}
    >
      <List>
        <ListItem button component={Link} to="/project/1">
          <ListItemIcon>
            <DashboardRoundedIcon />
          </ListItemIcon>
          <ListItemText>Board</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/projects">
          <ListItemIcon>
            <ViewListRoundedIcon />
          </ListItemIcon>
          <ListItemText>Projects</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};
