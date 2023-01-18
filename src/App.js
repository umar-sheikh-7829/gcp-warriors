import './App.css';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import ResultTable from './components/ResultTable/ResultTable';

function App() {

  return (
    <div className="App">
      <div className="Header">
      <Header/>
      </div>
      <Container/>
      <ResultTable/>
    </div>
  );
}

export default App;
