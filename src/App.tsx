import Router from './pages';
import {
  QueryClient,
  QueryClientProvider,
  /* useQuery,
  useQueries, */
} from 'react-query';
import { Reset } from 'styled-reset';
import './App.module.scss';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Reset />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
