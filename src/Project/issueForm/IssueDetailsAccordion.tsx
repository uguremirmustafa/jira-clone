import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistanceToNow, getTime } from 'date-fns';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IssueLabelsForm } from './IssueLabelsForm';
import { Labels } from '../../lib/generated/apolloComponents';
import { FC } from 'react';

interface Props {
  value:
    | {
        id: any;
        name: string;
      }[]
    | undefined;
  issueLoading: boolean;
  issueId: string;
  isOwnerOrMember: boolean;
}

export const IssueDetailsAccordion: FC<Props> = ({
  issueId,
  issueLoading,
  value,
  isOwnerOrMember,
}) => {
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          style={{ background: '#e5e5e5' }}
        >
          <Typography>Issue Details</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: '1rem', minHeight: '150px' }}>
          <Grid container>
            <Grid item xs={2}>
              <Typography color="secondary" variant="subtitle2">
                Labels
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography>
                <IssueLabelsForm
                  value={value}
                  issueLoading={issueLoading}
                  issueId={issueId}
                  isOwnerOrMember={isOwnerOrMember}
                />
              </Typography>
            </Grid>

            {/* <Grid item xs={6}>
              <Typography>Updated at:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{formattedUpdatedAt}</Typography>
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
