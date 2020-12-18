import {Request, Response} from "express";
import Player from "./Player";
import {plainToClass} from "class-transformer";
import {createNodeRedisClient} from "handy-redis";

const KEY: string = "scoreboard";

export function checkHealth(request: Request, response: Response) {
  response.send();
}

export async function savePlayer(request: Request, response: Response) {
  const player: Player = plainToClass(Player, request.body as Player);

  const client = createNodeRedisClient();
  try {
    await client.zadd(KEY, player.toArray());
    response.sendStatus(204);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
    return;
  }
}

export async function getTopNPlayers(request: Request, response: Response) {
  const N: number = Number.parseInt(request.query.N as string)

  const client = createNodeRedisClient();
  const playerNames: string[] = await client.zrevrange(KEY, 0, N - 1);
  const players: Player[] = [];
  for (let playerName of playerNames) {
    const score: number = Number.parseInt(await client.zscore(KEY, playerName));
    players.push(new Player(playerName, score))
  }

  response.json(players);
}

export async function getPlayer(request: Request, response: Response) {
  const playerName: string = request.params.name as string

  const client = createNodeRedisClient();
  const scoreStr: string = await client.zscore(KEY, playerName);
  if(scoreStr === null) {
    response.status(404).send({
      "message": "Player is not found"
    });
    return;
  }

  response.json(new Player(playerName, Number.parseInt(scoreStr)))
}

export async function updatePlayer(request: Request, response: Response) {
  const player: Player = plainToClass(Player, request.body as Player);

  const client = createNodeRedisClient();
  const scoreStr: string = await client.zscore(KEY, player.name);
  if(scoreStr === null) {
    response.status(404).send({
      "message": "Player is not found"
    });
    return;
  }
  try {
    await client.zadd(KEY, "XX", [player.score, player.name]);
    response.sendStatus(204);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
}
