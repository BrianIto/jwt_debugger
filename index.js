import express from "express";
import dotenv from "dotenv";
import * as jwt from "jwt-decode";
dotenv.config();

const app = express();

app.use(express.json());

// add cors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  next();
});

app.get("/jwtdecode", (req, res) => {
  if (req.header("Authorization")) {
    res.status(200).send(jwt.jwtDecode(req.header("Authorization")));
  } else {
    res.status(400).send({ message: "No token associated with this request" });
  }
});

let port = process.env.PORT ?? "3001";

app.listen(process.env.PORT ?? port);
console.log("Listening at port " + port);
