import logo from './logo.svg';
import './App.css';


import mySocket from './socket';
let socket = null;


function App() {
  
  socket = new mySocket();
  socket.addListen('system');
  socket.addListen('notice');
  const sendData = () => {
    socket.setMessage('system', 666).then(res => {
      console.log(res.msg)
    })
    socket.setMessage('notice', 666).then(res => {
      console.log(res.msg)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p onClick={sendData}>发送</p>
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
