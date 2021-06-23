
function stringInArray(param) {
  if(Array.isArray(param)) {
    return param;
  }
  if(typeof param === 'string')
    return [param];
  else return []
}

export default class mySocket {
  constructor(port = 8000) {
    this.port = port;
    this.handler = []; // 接受信息的所有对象
    this.user = []; // 正在接受信息的对象
    this.msg = undefined; // 正在接受的信息
    this.callBack = []; // 回调函数
    this.connect()
  }
  connect() {
    this.ws = new WebSocket(`ws://localhost:${this.port}`);
    this.status = true; // 表示是否连接状态
    this.ws.onopen = () =>  this.getConnectInfo();
    this.ws.onmessage = (message) => {this.getMessage(message)};
    // this.ws.onclose = this.onClose;
    // console.log(this.ws,'ws')
  }
  onClose() {
    this.connect();
  }
  getConnectInfo() {
    console.log(this.handler[this.handler.length-1]+'连接');
    // this.ws.readyState === 1 && this.ws.send("Hello WebSockets!");
  }
  addListen(message) {
    this.handler = [...this.handler, ...stringInArray(message)];
    this.getConnectInfo();
    
  }
  // 清空上一组信息
  clearLastMessage() {
    this.user = [];
    this.msg = undefined;
  }
  getMessage(message) {
    let msg = JSON.parse(message.data);
    if(!Array.isArray(msg)) return;
    this.clearLastMessage();
    if(!Array.isArray(msg[0])) msg[0] = [msg[0]];
    this.msg = msg[1];
    this.handler.map(item => {
      msg[0].includes(item) && this.user.push(item);
    })
    this.callBack[this.user] && this.callBack[this.user](this);
  }
  setMessage(user, message) {
    (this.ws.readyState === 1) && this.ws.send(JSON.stringify([user, message]));
    return new Promise((resolve,reject) => {
      this.callBack[user] = resolve;
    })
  }

}


