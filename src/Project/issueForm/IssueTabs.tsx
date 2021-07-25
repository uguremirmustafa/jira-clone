import { Box, Tabs, Theme, Typography, makeStyles, Tab, AppBar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { FC } from 'react';
import {
  useGetIssueCommentsLazyQuery,
  useGetIssueCommentsQuery,
} from '../../lib/generated/apolloComponents';
import { IssueCommentForm } from './IssueCommentForm';
import { IssueComments } from './IssueComments';

interface IProps {
  issueId: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`Issue-tabpanel-${index}`}
      aria-labelledby={`Issue-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box marginTop={3} marginLeft={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: any) {
  return {
    id: `Issue tab-${index}`,
    'aria-controls': `Issue-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const IssueTabs: FC<IProps> = ({ issueId }) => {
  const c = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={c.root}>
      <AppBar position="static" color="transparent" elevation={1}>
        <Tabs value={value} onChange={handleChange} aria-label="Issue tabs">
          <Tab label="Issue Status" {...a11yProps(0)} style={{ textTransform: 'none' }} />
          <Tab label="Comments" {...a11yProps(0)} style={{ textTransform: 'none' }} />
          <Tab label="History" {...a11yProps(1)} style={{ textTransform: 'none' }} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Issue Status
      </TabPanel>
      <TabPanel value={value} index={1}>
        <IssueComments issueId={issueId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        History
      </TabPanel>
    </div>
  );
};
