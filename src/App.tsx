import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Project } from './Project';
import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import { pink } from '@material-ui/core/colors';
import Navbar from './shared/Navbar';
import MainLayout from './shared/MainLayout';
import { SnackbarProvider } from 'notistack';
import { CreateProject } from './CreateProject';
import { ProjectsList } from './Projects';
import ConfirmDialog from './shared/ConfirmDialog';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: pink,
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Router>
          <MainLayout>
            <Navbar />
            <ConfirmDialog />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/createProject" component={CreateProject} />
              <Route path="/project/:id" component={Project} />
              <Route path="/projects" component={ProjectsList} />
            </Switch>
          </MainLayout>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
