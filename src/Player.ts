export default class Player {
  public name: string;
  public score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }

  public toArray(): [score: number, name: string] {
    return [this.score, this.name];
  }
}
