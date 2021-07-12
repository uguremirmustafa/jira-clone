import React, { FC } from 'react';
// material ui
import { IconButton, Menu, MenuItem } from '@material-ui/core';

interface IProps {
  items: any[];
  // itemClick: () => void;
  icon: any;
}

export const MenuButton: FC<IProps> = ({ items, icon }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <IconButton onClick={handleMenu}>{icon}</IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem
            onClick={() => {
              handleClose();
              // itemClick();
              item.func();
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
