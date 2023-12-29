const express = require("express");
const morgan = require("morgan");
const http = require("http");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const productRouter = require("./routes/productRouter");
const { getIdFromJWT } = require("./utils/random");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const transactionsRouter = require("./routes/transactionsRouter");
const auctionRouter = require("./routes/auctionRouter");
const barterRouter = require("./routes/barterRouter");
const employeeRouter = require("./routes/employeeRouter");
const reportRouter = require("./routes/reportRouter");
const warehouseRouter = require("./routes/warehouseRouter");
const shippingRouter = require("./routes/shippingRouter");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const socketIO = require("socket.io");
const cors = require("cors");

const db = require("./db/index");
const authController = require("./controllers/authController");

const app = express();
const server = http.createServer(app);
app.use(cors());

// app.get("/socket.io.js", (req, res) => {
//   res.sendFile(__dirname + "/node_modules/socket.io-client/dist/socket.io.js");
// });

// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", async (socket) => {
//   //console.log(socket);
//   const token = socket.handshake.query.jwt;
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//   console.log(decoded.id);
//   console.log("A user connected", socket.id);

//   const result = await db.query(
//     `Update "User" Set socketCode = '${socket.id}' WHERE id = '${decoded.id}';`
//   );

//   socket.on("notifyServer", () => {
//     console.log("Server received notification from client");

//     // Notify all connected clients
//     io.emit(
//       "notification",
//       "Hello, clients! Something happened on the server!"
//     );
//   });

//   // Disconnect event
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/buy", transactionsRouter);
app.use("/api/v1/auction", auctionRouter);
app.use("/api/v1/barter", barterRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/warehouse", warehouseRouter);
app.use("/api/v1/shipping", shippingRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can\'t find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = server;
