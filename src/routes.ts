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
  await client.zadd(KEY, [player.score, player.name]);
  response.sendStatus(204);
}

export async function getTopNPlayers(request: Request, response: Response) {
  const N: number = Number.parseInt(request.query.N as string)

  const client = createNodeRedisClient();
  await client.zrevrange(KEY, 0, N - 1, "WITHSCORES");

  response.json();
}

export async function getPlayer(request: Request, response: Response) {
  const playerName: string = request.params.name as string

  const client = createNodeRedisClient();
  const scoreString: string = await client.zscore(KEY, playerName);

  response.json(new Player(playerName, Number.parseInt(scoreString)))
}

export async function updatePlayer(request: Request, response: Response) {
  const player: Player = plainToClass(Player, request.body as Player);

  const client = createNodeRedisClient();
  await client.zadd(KEY, [player.score, player.name]);
  response.sendStatus(204);
}
