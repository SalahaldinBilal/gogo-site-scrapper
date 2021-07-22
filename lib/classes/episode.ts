import GogoHttp from "../http/gogo-http";
import GogoParser from "../parsers/gogo-parser";
import { EpisodeInfo } from "../types/episode-info";
import Anime from "./anime";

const http = new GogoHttp();
const parser = new GogoParser();

export default class Episode implements EpisodeInfo {
  anime: Anime;
  number: number;
  url: string;

  constructor(anime: Anime, data: EpisodeInfo) {
    this.anime = anime;
    this.number = data.number;
    this.url = data.url;
  }

  public getNextEpisode(cache: boolean = true) {
    return this.anime.getEpisode(this.number + 1, cache);
  }

  public async getPlayers() {
    const playerPage = await http.fetchPage(this.url);
    return playerPage.document && parser.getEpisodePlayers(playerPage.document);
  }
}