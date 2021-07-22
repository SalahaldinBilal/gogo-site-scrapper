import GogoHttp from "../http/gogo-http";
import GogoParser from "../parsers/gogo-parser";
import { EpisodeInfo } from "../types/episode-info";
import { AnimeInfo } from "../types/anime-info";
import Episode from "./episode";

const http = new GogoHttp();
const parser = new GogoParser();

export default class Anime implements AnimeInfo {
    id: number;
    coverImg: string;
    url: string;
    name: string;
    summary: string;
    genres: string[];
    released: Date;
    start: number;
    end: number;
    
    private _episodes?: Episode[] | undefined;

    constructor(data: AnimeInfo) {
        this.id = data.id;
        this.coverImg = data.coverImg;
        this.url = data.url;
        this.name = data.name;
        this.summary = data.summary;
        this.genres = data.genres;
        this.released = data.released;
        this.start = data.start;
        this.end = data.end;
    }

    public async getEpisodes(cache: boolean = true) {
        if (cache && this._episodes) return this._episodes;

        const episodeList = await http.getEpisodeList(this.start, this.end, this.id);
        const parsedEpList = parser.getEpisodeListing(episodeList.document);

        return this._episodes = parsedEpList.map(epinfo => new Episode(this, epinfo));
    }

    public async getEpisode(num: number, cache: boolean = true) {
        if (cache && this._episodes) return this._episodes.find(ep => ep.number === num);

        const episodeList = await http.getEpisodeList(num, num, this.id);
        const parsedEpList = parser.getEpisodeListing(episodeList.document);

        return parsedEpList.length? new Episode(this, parsedEpList[0]) : undefined;
    }

}