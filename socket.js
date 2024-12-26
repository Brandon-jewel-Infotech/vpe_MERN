
const message = (socket,socketIO) => {
    socket.on("message", (data) => {
      console.log("Message received");
      console.log(data);
      socketIO.emit("messageResponse", data);
    });
  };
  
module.exports= {message}