import React, { FC, useState } from 'react';
// material ui components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { useAuth0 } from '@auth0/auth0-react';
import { Projects, Users } from '../lib/generated/apolloComponents';
import { Link } from 'react-router-dom';
import { ListItemIcon, makeStyles, Typography } from '@material-ui/core';
import { CategoryRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    menuItem: {
      minWidth: '200px',
    },
  };
});

interface IProps {
  projects:
    | ({
        __typename?: 'projects' | undefined;
      } & Pick<Projects, 'title' | 'id' | 'description'> & {
          project_owner: {
            __typename?: 'users' | undefined;
          } & Pick<Users, 'id' | 'email'>;
        })[]
    | undefined;
  text: string;
}

const Dropdown: FC<IProps> = ({ projects, text }) => {
  const c = useStyles();

  const { isLoading } = useAuth0();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ExpandMoreRoundedIcon />}
      >
        {text}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isLoading ? (
          <MenuItem onClick={handleClose}>Loading...</MenuItem>
        ) : projects !== undefined && projects[0] !== undefined ? (
          projects?.map((project) => (
            <MenuItem
              key={project.id}
              onClick={handleClose}
              component={Link}
              to={`/project/${project.id}/board`}
              className={c.menuItem}
            >
              <ListItemIcon>
                <CategoryRounded />
              </ListItemIcon>
              <Typography variant="inherit">{project.title}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose} component={Link} to={`/createProject`}>
            You have no project. Click to create!
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Dropdown;
