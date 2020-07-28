const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

const messages = [
  { name: "Zee", message: "Hi" },
  { name: "Paraic", message: "Hello" },
];

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.send("chat app is working");
});
app.get("/messages", (req, res) => {
  res.send(messages);
});

app.listen(PORT, () => console.log(`chat-app listening on ${PORT}`));
