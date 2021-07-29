import GogoHttp from "../http/gogo-http";
import GogoParser from "../parsers/gogo-parser";
import { EpisodeInfo } from "../types/episode-info";
import { AnimeInfo } from "../types/anime-info";
import Episode from "./episode";
import Gogo from "../wrapper/gogo";

export default class Anime implements AnimeInfo {
  id: number;
  coverImg: string;
  url: string;
  name: string;
  summary: string;
  genres: string[];
  released: number;
  start: number;
  end: number;
  type: "dub" | "sub";

  private _gogowrap: Gogo;
  private _episodes?: Episode[] | undefined;

  constructor(gogowrap: Gogo, data: AnimeInfo) {
    this._gogowrap = gogowrap;
    this.id = data.id;
    this.coverImg = data.coverImg;
    this.url = data.url;
    this.name = data.name;
    this.summary = data.summary;
    this.genres = data.genres;
    this.released = data.released;
    this.start = data.start;
    this.end = data.end;
    this.type = data.type;
  }

  public async getEpisodes(cache: boolean = true) {
    if (cache && this._episodes) return this._episodes;

    const episodeList = await this._gogowrap.http.getEpisodeList(this.start, this.end, this.id);
    const parsedEpList = this._gogowrap.parser.getEpisodeListing(episodeList.document);

    return this._episodes = parsedEpList.map(epinfo => new Episode(this._gogowrap, this, epinfo));
  }

  public async getEpisode(num: number, cache: boolean = true) {
    if (cache && this._episodes) return this._episodes.find(ep => ep.number === num);

    const episodeList = await this._gogowrap.http.getEpisodeList(num, num, this.id);
    const parsedEpList = this._gogowrap.parser.getEpisodeListing(episodeList.document);

    return parsedEpList.length ? new Episode(this._gogowrap, this, parsedEpList[0]) : undefined;
  }

}