import { withAuthenticationRequired } from '@auth0/auth0-react';
// apollo component
import { useGetProjectsQuery } from '../lib/generated/apolloComponents';
// material ui components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.primary.light,
    },
  };
});

export const ProjectsList = withAuthenticationRequired(() => {
  const { data, loading, error } = useGetProjectsQuery();
  const c = useStyles();

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <Grid container spacing={3}>
      {data?.projects.map((i) => {
        return (
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card className={c.root} elevation={2}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {i.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {i.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="secondary">
                  Share
                </Button>
                <Button size="small" color="secondary" component={Link} to={`/project/${i.id}`}>
                  Go to project
                </Button>
              </CardActions>

              {/* <div>{i.project_owner.email}</div> */}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
});
