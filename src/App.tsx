import Layout from './shared/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Project } from './Project';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ProjectsList } from './Projects';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F3D56',
      light: '#F4F5F7',
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/project/:id" component={Project} />
            <Route path="/projects" component={ProjectsList} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
