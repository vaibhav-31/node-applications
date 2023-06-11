require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");


const ProductRouter = require("./routes/product");
const userRouter = require("./routes/user");
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth');
require('./events.js')

const server = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

const auth = ((req, res, next) => {
  const token = req.get('Authorization').split('Bearer ')[1];
  console.log(token);
  var decoded = jwt.verify(token, process.env.SECRET);
  if(decoded.email){
    next();
  } else {
    res.sendStatus(401)
  }
}); 

server.use(express.json());
server.use("/products", ProductRouter.router);
server.use("/users", auth, userRouter.router);
server.use("/auth", authRouter.router);

server.listen(process.env.PORT, () => {
  console.log("Server Started");
});
