const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("chat app is working");
});

app.listen(PORT, () => console.log(`chat-app listening on ${PORT}`));
