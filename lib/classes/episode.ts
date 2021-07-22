import GogoHttp from "../http/gogo-http";
import GogoParser from "../parsers/gogo-parser";
import { EpisodeInfo } from "../types/episode-info";
import Gogo from "../wrapper/gogo";
import Anime from "./anime";

export default class Episode implements EpisodeInfo {
  anime: Anime;
  number: number;
  url: string;

  private _gogowrap: Gogo;

  constructor(gogowrap: Gogo, anime: Anime, data: EpisodeInfo) {
    this._gogowrap = gogowrap;
    this.anime = anime;
    this.number = data.number;
    this.url = data.url;
  }

  public getNextEpisode(cache: boolean = true) {
    return this.anime.getEpisode(this.number + 1, cache);
  }

  public async getPlayers() {
    const playerPage = await this._gogowrap.http.fetchPage(this.url);
    return playerPage.document && this._gogowrap.parser.getEpisodePlayers(playerPage.document);
  }
}