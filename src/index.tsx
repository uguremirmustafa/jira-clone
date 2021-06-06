import ReactDOM from 'react-dom';
import App from './App';
import ApolloWrapper from './lib/apollo/client';
import CustomAuth0Provider from './lib/auth/authProvider';

ReactDOM.render(
  <CustomAuth0Provider>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </CustomAuth0Provider>,
  document.getElementById('root')
);
