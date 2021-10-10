
import './App.css';
import {MoviesContextProvider} from './context'
import HostPageComp from './HostPage';

function App() {
  return (

    <MoviesContextProvider>

    <div className="App">
      

      <HostPageComp/>
      
    </div>

    </MoviesContextProvider>
  );
}

export default App;
