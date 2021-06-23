
var WebSocket = require('ws');



function stringInArray(param) {
    if (Array.isArray(param)) {
        return param;
    }
    if (typeof param === 'string')
        return [param];
    else return []
}



class mySocket {
    constructor(port = 8000) {
        this.port = port;
        this.handler = []; // 发信息的所有对象
        this.msg = undefined; // 收到的信息
        this.user = []; // 正在发信息的对象
        this.callBack = {}; // 对象对应的函数
        this.connect()
    }
    connect() {
        let wss = new WebSocket.Server({ port: this.port });
        wss.on('connection', (message) => this.getConnect(message)) 
        this.status = true; // 表示是否连接状态
    }
    getConnect(ws) {
        this.ws = ws;
        // console.log(this.ws,'ws')
        this.ws.on('message', (message) => this.getMessage(message));
        // this.ws.on("close",  (message) => this.onClose(message));
        // this.ws.on("error", (message) => this.onClose(message));
    }
    onClose() {
        this.connect();
    }
    getConnectInfo() {
        console.log(this.handler[this.handler.length - 1] + '连接');
    }
    addListen(message, callBack) {
        this.handler = [...this.handler, ...stringInArray(message)];
        this.getConnectInfo();
        this.callBack[message] = callBack;
    }
    // 清空上一组信息
    clearLastMessage() {
        this.user = [];
        this.msg = undefined;
    }
    getMessage(message) {
        let msg = JSON.parse(message);
        if(!Array.isArray(msg)) return;
        if(!Array.isArray(msg[0])) {
            msg[0] = [msg[0]];
        }
        this.clearLastMessage();
        this.msg = msg[1];
        this.handler.map(item => {
            if(msg[0].includes(item)) {
                this.user.push(item);
            }
        });
        console.log(this.user, this.callBack)
        this.callBack[this.user] && this.callBack[this.user](this);
    }
    setMessage(user, message) {
       
        this.ws?.send(JSON.stringify([user, message]));
    }

}
function fun(res) {
    res.setMessage('system','6666666')
}
function fun2(res) {
    res.setMessage('notice','222')
}
let socket = new mySocket();
socket.addListen('system', fun)
socket.addListen('notice', fun2)