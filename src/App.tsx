import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Project } from './Project';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import { pink } from '@material-ui/core/colors';
import Navbar from './shared/Navbar';
import MainLayout from './shared/MainLayout';

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
      <Router>
        <MainLayout>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/project/:id" component={Project} />
          </Switch>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
