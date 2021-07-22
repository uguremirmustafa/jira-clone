import { Box, Chip, Divider, makeStyles, Typography } from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from '@material-ui/icons';

interface Props {
  value?: string | number;
  label: string;
}

const useStyles = makeStyles((theme) => {
  return {
    text: {
      paddingTop: theme.spacing(1),
    },
    priorityChip: {
      marginTop: theme.spacing(1),
    },
  };
});
export const priorityValues = [
  {
    value: 5,
    label: 'Highest Priority',
    icon: <ArrowUpward color="secondary" />,
  },
  { value: 4, label: 'High Priority', icon: <TrendingUp color="secondary" /> },
  {
    value: 3,
    label: 'Medium Priority',
    icon: <TrendingFlat color="secondary" />,
  },
  { value: 2, label: 'Low Priority', icon: <TrendingDown color="secondary" /> },
  {
    value: 1,
    label: 'Lowest Priority',
    icon: <ArrowDownward color="secondary" />,
  },
];
export const FieldForNonMembers = (props: Props) => {
  const c = useStyles();
  const isPriorityField = props.label === 'Priority';

  const currentPriorityValue = priorityValues.find((p) => p.value === props.value);

  return (
    <Box>
      <Typography color="secondary" variant="subtitle2">
        {props.label}
      </Typography>
      <Divider />
      {isPriorityField ? (
        <Chip
          variant="default"
          color="secondary"
          icon={currentPriorityValue?.icon}
          label={currentPriorityValue?.label}
          className={c.priorityChip}
        />
      ) : (
        <Typography variant="h6" component="h2" className={c.text}>
          {props.value}
        </Typography>
      )}
    </Box>
  );
};
