import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#efefef',
    },
    secondary: {
      main: '#f56565',
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        borderRadius: '1rem',
      },
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
    },
    MuiTextField: {
      size: 'small',
      InputProps: {
        disableUnderline: true,
      },
    },
    MuiSelect: {
      disableUnderline: true,
      variant: 'filled',
    },
    MuiChip: {
      size: 'small',
    },
  },
});
