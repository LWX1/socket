import logo from './logo.svg';
import './App.css';


function App() {

  // 建立socket链接
  const createConnet = () => {
    console.log('创建')
    var ws = new WebSocket('ws://localhost:8080');
    ws.onopen = function () {
      console.log('ws onopen');
      ws.send('from client: hello');
    };
    ws.onmessage = function (e) {
      console.log('ws onmessage');
      console.log('from server: ' + e.data);
    };

  };
  createConnet()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
