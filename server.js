import http from "http";
import app from "./app.js   ";

const normaliseport = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normaliseport(process.env.PORT || "3000");
app.set("port", port);
const server = http.createServer(app);

const errorhandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const adrress = server.address();
  const bind =
    typeof adrress === "string" ? "pipe " + adrress : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + "required elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already use ");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorhandler);
server.on("listening", () => {
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
