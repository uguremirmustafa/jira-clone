import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Project } from './Project';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import { pink } from '@material-ui/core/colors';
import Navbar from './shared/Navbar';
import MainLayout from './shared/MainLayout';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';
import { CreateProject } from './CreateProject';

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
          horizontal: 'center',
        }}
      >
        <Router>
          <MainLayout>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/createProject" component={CreateProject} />
              <Route path="/project/:id" component={Project} />
            </Switch>
          </MainLayout>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
