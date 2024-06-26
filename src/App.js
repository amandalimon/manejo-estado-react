import { UseState } from './UseState.js';
import { UseReducer } from './UseReducer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="Use Reducer"/>
    </div>
  );
}

export default App;
