const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const webtoon = [
  {
    id: 1,
    day: "월요일",
    name: "참교육",
  },
  {
    id: 2,
    day: "목요일",
    name: "정글주스",
  },
];

app.get("/webtoon", (req, res) => {
  res.json(webtoon);
});

app.get("/webtoon/mon", (req, res) => {
  let resData = [];
  for (let i = 0; i < webtoon.length; i++) {
    if (webtoon[i].day === "월요일") {
      resData.push(webtoon[i]);
    }
  }
  res.json(resData);
});

app.get("/webtoon/:id", (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = webtoon.find((i) => i.id == itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.post("/webtoon", (req, res) => {
  const newItem = req.body;
  newItem.id = webtoon.length + 1;
  webtoon.push(newItem);
  res.status(200).json(newItem);
});

app.listen(port, () => {
  console.log(`${port}에서 서버가 실행됐어요.`);
});
