const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const users = [];

const addUser = (userId, socketId) => { !users.some(user => user.userId === userId) && users.push({ userId, socketId }) };
const removeUser = userId => { users = users.filter(user => user.socketId !== socketId) };
const getUser = userId => users.find(user => user.userId === userId);

io.on("connection", socket => {
    console.log("a user connected");
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ userId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", { userId, text });
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});
