import express from "express";
import bodyParser from "body-parser";
import {
  checkHealth,
  getPlayer,
  getPlayerRank,
  getTopNPlayers,
  savePlayer,
  updatePlayer
} from "./routes";

const app = express();
const PORT = 8888;

app.use(bodyParser.json());

app.get("/check", checkHealth);
app.post("/players", savePlayer);
app.get("/players", getTopNPlayers);
app.get("/players/:name", getPlayer);
app.get("/players/:name/rank", getPlayerRank);
app.put("/players", updatePlayer);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
