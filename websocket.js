const ws = require("ws");

const webSocketServer = new ws.Server(
    { port:5000, },
    () => console.log("Server started at port 5000")
);

webSocketServer.on("connection", function connection(ws) {
    ws.on("message", function(message) {
        message = JSON.parse(message);
        switch (message.event) {
            case "message":
                broadcastMessage(message);
                break;
            case "connection":
                broadcastMessage(message);
                break;
        }
    });
});

const message = {
    event:"message/connection",
    id: 789,
    date: "24.08.2022",
    username: "VVP",
    textMessage: "Some message",
};

function broadcastMessage(msg) {
    webSocketServer.clients.forEach(
        client => {
            client.send(JSON.stringify(msg))
        }
    );
}
