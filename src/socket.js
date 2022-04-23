import { io } from "socket.io-client";
// export const socket = io(process.env.REACT_APP_WS_ENDPOINT, {
//   path: "/socketio",
// //   transports: ["websocket"],
// });
// import io from 'socket.io-client';
let socket;

/** Here we are initilize a socket and provide the url which url and port socket are run */
export const initiateSocket = (room) => {
  socket = io(process.env.REACT_APP_WS_ENDPOINT, {
    path: "/socketio",
    //   transports: ["websocket"],
  });
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit("join", room);
};


/** Disconnect the socket */
export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};


/** Create events according to the task where ssocket io work  */
export const subscribeToChanges = (cb) => {
  if (!socket) return true;
  socket.on("message", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const subscribeToRemoveContent = (cb) => {
  if (!socket) return true;
  socket.on("removeContent", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const subscribeToAddContent = (cb) => {
  if (!socket) return true;
  socket.on("addContent", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const subscribeToAddContentAll = (cb) => {
  if (!socket) return true;
  socket.on("addContentToAll", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const subscribeToSync = (cb) => {
  if (!socket) return true;
  socket.on("sync", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const subscribeToUpdate = (cb) => {
  if (!socket) return true;
  socket.on("update", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const subscribeToRemoveInfluencer = (cb) => {
  if (!socket) return true;
  socket.on("removeInfluencer", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const subscribeToDeleteMix = (cb) => {
  if (!socket) return true;
  socket.on("deleteMix", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const subscribeToNewMix = (cb) => {
  if (!socket) return true;
  socket.on("sendNewMixData", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
  });
};

export const sendMessage = (room, data) => {
  if (socket) socket.emit("message", { data, room });
};

export const removeContent = (room, data) => {
  if (socket) socket.emit("removeContent", { data, room });
};

export const syncData = (room, data) => {
  if (socket) socket.emit("sync", { data, room });
};

export const updateData = (room, data) => {
  if (socket) socket.emit("update", { data, room });
};

export const addContentToAll = (room, data) => {
  if (socket) socket.emit("addContentToAll", { data, room });
};

export const addContent = (room, data) => {
  if (socket) socket.emit("addContent", { data, room });
};

export const removeInfluencer = (room, data) => {
  if (socket) socket.emit("removeInfluencer", { data, room });
};

export const deleteMix = (room, data) => {
  if (socket) socket.emit("deleteMix", { data, room });
};

export const sendNewMixData = (room, data) => {
  if (socket) socket.emit("sendNewMixData", { data, room });
};
