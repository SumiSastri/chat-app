const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("chat app is working");
});

app.listen(PORT, () => console.log(`chat-app listening on ${PORT}`));
