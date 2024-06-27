const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const { PORT, MONGO_URI } = process.env;

app.use(express.json());

mongoose.connect(MONGO_URI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const itemSchema = new mongoose.Schema({
  name: String,
  day: String,
});

const Item = mongoose.model("Item", itemSchema);

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
  const item = webtoon.find((i) => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.post("/webtoon", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).send(item);
});

app.delete("/webtoon/:id", (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const itemIndex = webtoon.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    webtoon.splice(itemId + 1, 1);
    res.status(204).send("데이터 삭제됨");
  } else {
    res.status(404).json({ message: "삭제할 데이터가 없음" });
  }
});

app.put("/webtoon/:id", (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const itemIndex = webtoon.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    const updatedItem = { ...webtoon[itemIndex + 1], ...req.body };
    webtoon[itemIndex + 1] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: "업데이트 할 데이터가 없음" });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버가 켜졌습니다.`);
});
