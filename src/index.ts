import 'reflect-metadata';
import express from 'express';
import bodyParser from "body-parser";
import {plainToClass} from "class-transformer";
import Player from "./Player";

const app = express();
const PORT = 8888;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Express + TypeScript Server"));
app.post("/players", (req, res) => {
  const player: Player = plainToClass(Player, req.body as Player);
  res.json(player);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
