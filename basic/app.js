const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/go", (req, res) => {
  res.sendFile(__dirname + "/go.html");
});

app.listen(port, () => {
  console.log(`${port}에서 서버가 실행됐어요.`);
});
