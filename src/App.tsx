import Router from './pages';
import { Reset } from 'styled-reset';
import './App.module.scss';

function App() {
  return (
    <>
      <Reset />
      <Router />
    </>
  );
}

export default App;
